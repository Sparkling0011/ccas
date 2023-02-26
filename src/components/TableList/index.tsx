import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import type { ForwardedRef } from 'react';
import React, { forwardRef, useState } from 'react';
import { saveAs } from 'file-saver';
import Upload from '@/components/Upload';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
// const handleUpdate = async (fields: FormValueType) => {
//   const hide = message.loading('Configuring');
//   try {
//     await updateRule({
//       name: fields.name,
//       desc: fields.desc,
//       key: fields.key,
//     });
//     hide();
//     message.success('Configuration is successful');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Configuration failed, please try again!');
//     return false;
//   }
// };

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
// const handleRemove = async (selectedRows: API.RuleListItem[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     await removeRule({
//       key: selectedRows.map((row) => row.key),
//     });
//     hide();
//     message.success('Deleted successfully and will refresh soon');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Delete failed, please try again');
//     return false;
//   }
// };

interface tableProps {
  type: string;
  columns: ProColumns[];
  request: (
    params: {
      pageIndex?: number;
      pageSize?: number;
    },
    options?: Record<string, any>,
  ) => any;
  actions: {
    upload: (body: API.UploadInfoType, options?: Record<string, any>) => any;
    download: (options?: Record<string, any>) => any;
  };
}

const TableList: React.FC<tableProps> = forwardRef(
  ({ columns, request, type, actions }, ref: ForwardedRef<ActionType>) => {
    /**
     * @en-US Pop-up window of new window
     * @zh-CN 新建窗口的弹窗
     *  */
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    const [showDetail, setShowDetail] = useState<boolean>(false);
    // const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
    const [selectedRowsState, setSelectedRows] = useState<[]>([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    return (
      <PageContainer>
        <ProTable<API.RuleListItem, API.PageParams>
          headerTitle={'查询' + type + '信息'}
          actionRef={ref}
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> 更新{type}信息
            </Button>,
            <Button
              type="primary"
              key="primary"
              onClick={async () => {
                const response = await actions.download();
                const file = new File([response], `${type}信息`, {
                  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
                });
                saveAs(file);
              }}
            >
              <DownloadOutlined /> 导出{type}信息
            </Button>,
          ]}
          request={({ current, pageSize }) => request({ pageIndex: current, pageSize })}
          columns={columns}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
        />
        {selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                已选择{' '}
                <a
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {selectedRowsState.length}
                </a>{' '}
                项 &nbsp;&nbsp;
                <span>
                  服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                  万
                </span>
              </div>
            }
          >
            <Button
              onClick={async () => {
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                ref.current?.reloadAndRest?.();
              }}
            >
              批量删除
            </Button>
            <Button type="primary">批量审批</Button>
          </FooterToolbar>
        )}
        <ModalForm
          title={'新增' + type + '信息'}
          width="500px"
          open={createModalVisible}
          onOpenChange={handleModalVisible}
          submitter={false}
        >
          <Upload
            onSubmit={async (value) => {
              const success = await actions.upload(value);
              console.log(success);
              if (!!success) {
                handleModalVisible(false);
                setCurrentRow(undefined);
                if (ref?.current) {
                  ref.current.reload();
                }
                message.success(`新增${type}信息成功`);
              }
            }}
          />
        </ModalForm>

        <Drawer
          width={600}
          open={showDetail}
          onClose={() => {
            setCurrentRow(undefined);
            setShowDetail(false);
          }}
          closable={false}
        >
          {currentRow?.name && (
            <ProDescriptions<API.RuleListItem>
              column={2}
              title={currentRow?.name}
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.name,
              }}
              columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
            />
          )}
        </Drawer>
      </PageContainer>
    );
  },
);
export default TableList;
