<template>
  <div class="order">
    <div class="title">订单查询</div>
    <div class="input">
      <el-input placeholder="请输入查找的内容" v-model="searchText"></el-input>
    </div>
    <el-table
      border
      ref="filterTable"
      :data="allOrder"
      style="width: 80%"
      height="600"
      max-height="600"
      stripe
    >
      <!-- <el-table-column prop="id" label="id" align="center"></el-table-column> -->
      <el-table-column
        prop="userName"
        label="提交人"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="orderDate"
        label="订购日期"
        align="center"
        sortable
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            dayjs(scope.row.orderDate).format("YYYY-MM-DD")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderName"
        label="商品名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="brand"
        label="品牌要求"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="specification"
        label="规格"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="amount"
        label="数量"
        align="center"
      ></el-table-column>
      <el-table-column label="备注（淘宝链接）" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.description.length > 20">
            <el-popover
              placement="bottom"
              title=""
              width="200"
              trigger="click"
              :content="scope.row.description"
            >
              <el-button slot="reference">点击查看</el-button>
            </el-popover>
          </div>

          <div v-else>
            {{
              scope.row.description.length > 20
                ? scope.row.description.substring(0, 20) + "..."
                : scope.row.description
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        align="center"
        sortable
        :sort-method="price()"
      ></el-table-column>
      <el-table-column
        prop="classification"
        label="类型"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
        align="center"
        sortable
        :sort-method="sortStatus()"
      >
        <template slot-scope="scope">
          <el-tag type="" v-if="scope.row.orderStatus === '1'"
            >已提交未订购</el-tag
          >
          <el-tag type="warning" v-if="scope.row.orderStatus === '2'"
            >已订购</el-tag
          >
          <el-tag type="info" v-if="scope.row.orderStatus === '3'"
            >已取消</el-tag
          >
          <el-tag type="success" v-if="scope.row.orderStatus === '4'"
            >订单完成</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column width="100" label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <div v-if="false">{{ scope }}</div>
            <el-button type="primary" @click="editOrder(scope.row.id)"
              >编辑</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑订单信息" :visible.sync="dialogVisible">
      <div class="dialog">
        <div class="dialogLine">
          <div class="lineTitle">价格</div>
          <el-input v-model="orderEditDialog.price"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">类型</div>
          <el-input v-model="orderEditDialog.classification"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">订单状态</div>
          <el-select v-model="orderEditDialog.orderStatus">
            <el-option label="已提交未订购" value="1"></el-option>
            <el-option label="已订购" value="2"></el-option>
            <el-option label="已取消" value="3"></el-option>
            <el-option label="订单完成" value="4"></el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendForm()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="back">
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "getOrder",
  data() {
    return {
      dayjs: "",
      allOrder: null,
      baseOrder: null,
      searchText: "",

      orderEditDialog: {
        price: "1",
        classification: "",
        orderStatus: "1",
      },

      dialogVisible: false,
    };
  },
  created() {
    this.dayjs = dayjs;
  },
  mounted() {
    this.getAllOrder();
  },

  methods: {
    sortStatus() {
      return (a, b) => {
        if (a.orderStatus < b.orderStatus) {
          return -1;
        }
        if (a.orderStatus > b.orderStatus) {
          return 1;
        }
        return 0;
      };
    },
    price() {
      return (a, b) => {
        return a.price - b.price;
      };
    },

    editOrder(id) {
      this.dialogVisible = true;

      this.orderEditDialog = this._.cloneDeep(
        this._.find(this.allOrder, (item) => item.id === id)
      );
    },
    search() {
      // this.$refs.filterTable.filter(this.searchText);
      let res = this.baseOrder.filter((item) => {
        for (let key in item) {
          if (String(item[key]).indexOf(this.searchText) !== -1) {
            return true;
          }
        }
      });
      this.allOrder = res;
    },
    async getAllOrder() {
      const res = await this.axios.get("order/getAllOrder");
      this.baseOrder = this._.cloneDeep(res.data.data);
      this.allOrder = this._.cloneDeep(this.baseOrder).sort((a, b) => {
        return new Date(b.orderDate) - new Date(a.orderDate);
      });
    },
    async sendForm() {
      const res = await this.axios.post(
        "order/editOrder",
        this.orderEditDialog
      );
      console.log(res);
      if (res.data.code === "0") {
        this.getAllOrder();
        this.$message.success(res.data.msg);
        this.dialogVisible = false;
      }
    },
  },
  watch: {
    searchText() {
      if (this.searchText) {
        this.search();
      } else {
        this.getAllOrder();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.order {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  // padding: 20px;
  .title {
    font-size: 40px;
    font-weight: bold;
    margin-top: 100px;
    margin-bottom: 20px;
  }
  .input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
  }

  .back {
    margin-top: 40px;
  }
  .dialog {
    padding: 10px;
    .dialogLine {
      display: flex;
      margin-bottom: 20px;
      flex-direction: row;
      .lineTitle {
        width: 80px;
        max-width: 80px;
        min-width: 80px;
        text-align: left;
        line-height: 40px;
      }
    }
  }
}
</style>
