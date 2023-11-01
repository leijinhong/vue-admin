<template>
  <div style="height: 600px; overflow: hidden; overflow-y: auto" class="scroll">
    <div>
      <p class="my-5">基本信息：</p>
      <div
        style="border-top: 1px solid #cccccc"
        class="flex shrink flex-wrap w-full"
      >
        <div
          v-for="(item, index) in detailInfo.list"
          :key="index"
          class="item flex h-10 leading-10 bg-white"
          style="width: 50%"
        >
          <div
            class="text-center"
            style="width: calc(100% * calc(178 / 690))"
            :style="{
              background:
                index % 4 === 0 || index % 4 === 1 ? '#e7effd' : '#dce7fc'
            }"
          >
            {{ item.label }}
          </div>
          <div
            class="text-center"
            style="width: calc(100% * calc(512 / 690))"
            :style="{
              background:
                index % 4 === 0 || index % 4 === 1 ? '#ffffff' : '#f3f7fe'
            }"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <p class="my-5">产品：</p>
      <div style="border-bottom: 1px solid #cccccc">
        <pure-table
          align-whole="center"
          :header-cell-style="{
            color: 'var(--el-text-color-primary)'
          }"
          stripe
          showOverflowTooltip
          :data="tableData"
          :columns="columns"
        >
          <template #unitPrice>含税单价<br />(单位：元)</template>
          <template #finalPrice>含税成交价<br />(单位：元)</template>
          <template #untaxedPrice>未税价<br />(单位：元)</template>
        </pure-table>
      </div>
    </div>
    <div>
      <p class="my-5">交付计划：</p>
      <div style="border-bottom: 1px solid #cccccc">
        <pure-table
          align-whole="center"
          :header-cell-style="{
            color: 'var(--el-text-color-primary)'
          }"
          showOverflowTooltip
          stripe
          :data="tableData2"
          :columns="columns2"
        >
          <template #amount>金额<br />(单位：元)</template>
          <template #invoicingAmount>开票金额 <br />(单位：元)</template>
        </pure-table>
      </div>
    </div>
    <div>
      <p class="my-5">合同附件：</p>
      <p
        @click="
          downloadByUrl(
            'https://github.com/xiaoxian521/xiaoxian521/archive/refs/heads/main.zip',
            'xiaoxian521.zip'
          )
        "
        class="text-primary cursor-pointer"
      >
        销售产品说明书.DOC
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { downloadByUrl } from "@pureadmin/utils";
import { onMounted } from "vue";
import { getProjectDetail } from "@/api/project";
import { reactive, ref } from "vue";
import dayjs from "dayjs";
export default {
  setup() {
    let detailInfo = reactive({
      list: []
    }); //项目详情的基本信息

    function fetchProjectDetail(id) {
      getProjectDetail({ id: id }).then(res => {
        const { data } = res;
        detailInfo.list = [
          {
            label: "项目编号",
            value: ""
          },
          {
            label: "项目阶段",
            value: ""
          },
          {
            label: "项目名称",
            value: ""
          },
          {
            label: "客户名称",
            value: ""
          },
          {
            label: "合同编号",
            value: ""
          },
          {
            label: "合同金额",
            value: ""
          },
          {
            label: "签约日期",
            value: ""
          },
          {
            label: "签约主体",
            value: ""
          },
          {
            label: "客户性质",
            value: ""
          },
          {
            label: "销售模式",
            value: ""
          },
          {
            label: "销售区域",
            value: ""
          },
          {
            label: "应用领域",
            value: ""
          },
          {
            label: "合同生效期限",
            value: ""
          },
          {
            label: "最终用户",
            value: ""
          },
          {
            label: "技术服务期限",
            value: ""
          },
          {
            label: "质保生效期限",
            value: ""
          },
          {
            label: "授权码给出时间",
            value: ""
          },
          {
            label: "质保比例",
            value: ""
          },
          {
            label: "客户经理",
            value: ""
          },
          {
            label: "项目经理",
            value: ""
          },
          {
            label: "解决方案经理",
            value: ""
          },
          {
            label: "现场工程师",
            value: ""
          },
          {
            label: "项目组成员",
            value: ""
          },
          {
            label: "",
            value: ""
          }
        ];
      });
    }
    /*    */
    const tableData = [
      {
        product_name: "服务器密码机",
        product_type: "产品类型",
        product_model: "SJJ1631SJJ1631",
        number: 3,
        unit_price: 400,
        final_price: 360,
        tax_rate: "3%",
        untaxed_price: 371.13,
        soft_title: "服务器密码机软件V4.0",
        notes: "客户要求发货时，通知她，并且发送快递单号"
      }
    ];
    const columns: TableColumnList = [
      {
        label: "产品名称",
        prop: "product_name"
      },
      {
        label: "产品类型",
        prop: "product_type"
      },
      {
        label: "产品型号",
        prop: "product_model",
        width: 135
      },
      {
        label: "数量",
        prop: "number"
      },
      {
        headerSlot: "unitPrice",
        prop: "unit_price"
      },
      {
        headerSlot: "finalPrice",
        prop: "final_price"
      },
      {
        label: "税率",
        prop: "tax_rate"
      },
      {
        headerSlot: "untaxedPrice",
        prop: "untaxed_price"
      },
      {
        label: "软著名称",
        prop: "soft_title",
        width: 160
      },
      {
        label: "备注",
        prop: "notes",
        width: 300
      }
    ];
    const tableData2 = [
      {
        plan_name: "初验",
        amount: "1,000,100.00",
        acceptance_date: "2023-10-10",
        payment_method: "银行卡汇款",
        received_amount: "1,000,100.00",
        collection_methods: "银行卡",
        receipt_date: "2023-10-10",
        payee: "郑永兴",
        overdue_status: "正常",
        invoicing_amount: "1,000,100.00",
        invoice_number: "05102364",
        notes: "备注信息"
      }
    ];
    const columns2: TableColumnList = [
      {
        label: "计划名称",
        prop: "plan_name"
      },
      {
        headerSlot: "amount",
        prop: "amount"
      },
      {
        label: "验收日期",
        prop: "acceptance_date"
      },
      {
        label: "付款方式",
        prop: "payment_method"
      },
      {
        label: "已收款金额",
        prop: "received_amount"
      },
      {
        label: "收款方式",
        prop: "collection_methods"
      },
      {
        label: "收款日期",
        prop: "receipt_date"
      },
      {
        label: "收款人",
        prop: "payee"
      },
      {
        label: "逾期状态",
        prop: "overdue_status"
      },
      {
        headerSlot: "invoicingAmount",
        prop: "invoicing_amount"
      },
      {
        label: "发票号",
        prop: "invoice_number"
      },
      {
        label: "备注",
        prop: "notes"
      }
    ];
    onMounted(() => {
      fetchProjectDetail(49);
    });
    return {
      detailInfo,
      tableData,
      columns,
      tableData2,
      columns2,
      downloadByUrl
    };
  }
};
</script>

<style lang="scss">
.el-table {
  .el-table__header-wrapper {
    thead th.el-table__cell .cell {
      height: auto;
      color: #333333 !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.scroll {
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
