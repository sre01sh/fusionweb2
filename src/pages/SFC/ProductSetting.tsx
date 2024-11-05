import type { ProColumns, ProFormInstance} from '@ant-design/pro-components';
import {  ProCard, ProForm, ProFormDependency, ProFormDigit, ProFormItem,  ProFormSelect,  ProFormSwitch,  ProFormText, ProFormTextArea,  ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { getSfcProductNoList, getProductSettingByPid, submitSfcProduct, getWorkflows } from '@/services/api';
import type { API } from '@/services/typings';
import type { InputRef} from 'antd';
import { Button, Input, message, Select, Space } from 'antd';
import { useTableScroll } from '../components/HieghtUtil';
import { SearchOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'umi';



export default () => {
  console.log('testing');
  const areas=["PCBA"];
  const [area, setArea] = useState<string>('PCBA');
  const [product, setProduct] = useState<API.SfcProduct>();

  const formRef = useRef<ProFormInstance<API.ProductSetting>>();
  const [loading, setLoading] = useState<boolean>(false);
  const tableSrcollHeight = useTableScroll({ extraHeight: 78 });

  const [searchText, setSearchText] = useState('');
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (selectedKeys: string[], confirm: () => void) => {
    setSearchText(selectedKeys[0]);
    confirm();
  };

  const handleReset = (clearFilters: () => void, confirm: () => void) => {
    clearFilters();
    setSearchText('');
    confirm();
  };

  const columns: ProColumns<API.SfcProduct>[] = [
    {
      title: '产品编号',
      dataIndex: 'productNo',
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            value={`${selectedKeys[0] || ''}`}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
            style={{ marginBottom: 6, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              &nbsp; <FormattedMessage id="common.search" />
            </Button>
            <Button
              type="link"
              onClick={() => clearFilters && handleReset(clearFilters, confirm)}
              size="small"
              style={{ width: 90 }}
            >
              <b>
                <FormattedMessage id="common.reset" />
              </b>
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => {
        return (record.productNo || '')
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase());
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
  ];

  return (
    <ProCard split="vertical" style={{ height: '100%' }}>
      <ProCard colSpan="300px" ghost>
      <Space>
      <Select
              value={area}
              style={{ marginLeft: "1.5rem", width: "8rem",marginBottom: "1rem",marginTop: "1rem" }}
              onChange={(p) => setArea(p)}
              options={areas?.map((p) => ({ label: p, value: p }))}
            />
      </Space>
      
      <ProTable<API.SfcProduct>
        columns={columns}
        request={async (params) => {
          try {
            return await getSfcProductNoList(params);
          } catch (e) {
            console.log('ProductMgmt::getProductNoList::error', e);
            return {};
          }
        }}
        rowKey="id"
        scroll={{
          y: tableSrcollHeight,
        }}
        options={false}
        pagination={false}
        search={false}
        params={{
          area,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
               setProduct(record);
            },
          };
        }}
      />

      </ProCard>
      <ProCard title={   (product?.id)?("当前产品："+ product?.productNo):"新建产品"} headerBordered>
        <div style={{ height: '100%' }}>
          
            <ProCard
          tabs={{
            type: 'card',
          }}

        >
          <ProCard.TabPane key={product?.id} tab="基础配置">
            <ProForm<API.ProductSetting>
              submitter={{
                searchConfig: {
                  resetText: '重置',
                  submitText: (product?.id)?'更新':'新建',
                },
              }}
              onFinish={async (values) => {
                  console.log(values);
                  const val1 = await formRef.current?.validateFields();
                  console.log('validateFields:', val1);
                  const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
                  console.log('validateFieldsReturnFormatValue:', val2);
                  setLoading(true);
                  try {
                    if(val2)
                      await submitSfcProduct(values);
                    message.success('提交成功');
                     
                  } catch (e) {
                    console.log('submitLineMatPull', e);
                  } finally {
                    setLoading(false);
                  }
                  
              }}
              formRef={formRef}
              params={{ id: product?.id }}
              request={async (params ) => {
                try {
                  if(params.id)
                    return (await getProductSettingByPid(params)).data;
                  else
                    return {};
                } catch (e) {
                  console.log('ProductMgmt::getProductSettingByPid::error', e);
                  return {};
                }
              }}
            > 
            <ProFormItem hidden={true}
                name={['product', 'id']}
              />
            <ProForm.Group>
            <ProFormText
                width="lg"
                name={['product', 'productNo']}
                label="产品编号"
                tooltip="最长为 128 位"
                placeholder="请输入编号"
                rules={[{ required: true }]}
              />
              <ProFormSelect
                options={[
                  {
                    value: "PCBA",
                    label: "PCBA",
                  },
                ]}
                width="xs"
                name={['product', 'area']}
                rules={[{ required: true }]}
                label="产品所属部门"
              />
              </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                width="md"
                name={['product', 'name']}
                label="产品名称"
                placeholder=""
              />
              <ProFormText
                width="md"
                name={['product', 'productFamily']}
                label="产品族"
                placeholder=""
              />
              <ProFormText
                width="xs"
                name={['product', 'uom']}
                label="UOM"
                placeholder=""
              />
            </ProForm.Group>


            <ProForm.Group>
            <ProFormSelect
            width="lg"
            name="workflowId"
            label="Workflow选择"
            showSearch
            fieldProps={{
              fetchDataOnSearch: false,
            }}
            params={{area}}
            request={async (params) => {
              try {
              if(params.area)
                return (
                  await getWorkflows(params))?.data.map(item => ({
                  value: item.id,
                  label: item.name
                }));
                else 
                 return [];
              } catch (e) {
                console.log('WorkflowList::getWorkflows::error', e);
                return [];
              }
            }}
            placeholder="请选择Workflow"
          />
          </ProForm.Group>

            <ProForm.Group>
            <ProFormDigit
              width="xs"
              name={['product', 'arrayQty']}
              label="小板数"
            />
              <ProFormSelect
                options={[
                  {
                    value: "NA",
                    label: "NA",
                  },
                  {
                    value: "SINGLE",
                    label: "单面",
                  },
                  {
                    value: "DOUBLE",
                    label: "双面",
                  },
                ]}
                width="sm"
                name={['product', 'sideType']}
                label="PCB单双面"
              />
              <ProFormDigit
              width="sm"
              name={['product', 'timeControlA']}
              label="工艺时间控制(分钟)"
            />
            
            </ProForm.Group>
            <ProForm.Group>
                   <ProFormDigit
                   width="xs"
                   name={['product', 'maxTestCount']}
                   label="可重测次数"
                 />
            </ProForm.Group>
            <ProForm.Group>
            <ProFormDependency name={['product','secondaryPkgTrace']}>
            {(depValues) => (
                   <ProFormDigit
                   width="xs"
                   name={['product', 'secondarySpq']}
                   label="包装SPQ"
                   disabled={!(depValues?.product?.secondaryPkgTrace || false)}
                 />
                )}
            </ProFormDependency>
            <ProFormSwitch name={['product', 'secondaryPkgTrace']} label="启用包装" />
            </ProForm.Group>
            
            <ProForm.Group>
            <ProFormDependency name={['product', 'tertiaryPkgTrace']}>
            {(depValues) => (
                      
                   <ProFormDigit
                   width="xs"
                   name={['product', 'tertiarySpq']}
                   label={"栈板SPQ"}
                   disabled={!(depValues?.product?.tertiaryPkgTrace || false)}
                 />
                 
                 
                )}
            </ProFormDependency>
            <ProFormSwitch name={['product', 'tertiaryPkgTrace']} label="启用栈板" />
            </ProForm.Group>
            
            <ProFormText width="md" name={['product', 'customer']} label="客户名称" />
          
            <ProFormTextArea width="lg" label="备注说明"  name={['product', 'description']} placeholder=""/>
          </ProForm>
          </ProCard.TabPane>

        </ProCard>

        </div>
      </ProCard>
    </ProCard>
  );
};

 