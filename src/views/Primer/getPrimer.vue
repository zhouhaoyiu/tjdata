<template>
  <div class="primer">
    <div class="title">查找引物</div>
    <div class="input">
      <el-input placeholder="请输入查找的内容" v-model="searchText"></el-input>
    </div>
    <el-table
      border
      ref="filterTable"
      :data="allPrimer"
      style="width: 80%"
      height="600"
      max-height="600"
      stripe
    >
      <el-table-column
        prop="userName"
        label="用户名"
        align="center"
      ></el-table-column>
      <el-table-column label="订单日期" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            dayjs(scope.row.orderDate).format("YYYY-MM-DD")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="primerName"
        label="引物名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="baseSequence"
        label="引物序列"
        align="center"
      ></el-table-column>
    </el-table>
    <div class="back">
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "getPrimer",
  data() {
    return {
      dayjs: "",
      allPrimer: null,
      basePrimer: null,
      searchText: "",
    };
  },
  created() {
    this.dayjs = dayjs;
  },
  mounted() {
    this.getAllPrimer();
  },

  methods: {
    search() {
      // this.$refs.filterTable.filter(this.searchText);
      let res = this.basePrimer.filter((item) => {
        for (let key in item) {
          if (String(item[key]).indexOf(this.searchText) !== -1) {
            return true;
          }
        }
      });
      this.allPrimer = res;
    },
    async getAllPrimer() {
      const res = await this.axios.get("primer/getAllPrimer");
      this.allPrimer = this.basePrimer = res.data.data;
    },
  },
  watch: {
    searchText() {
      if (this.searchText) {
        this.search();
      } else {
        this.getAllPrimer();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.primer {
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
    margin-top: 60px;
  }
}
</style>
