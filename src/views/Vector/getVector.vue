<template>
  <div class="vector">
    <div class="title">查找质粒</div>
    <div class="input">
      <el-input placeholder="请输入查找的内容" v-model="searchText"></el-input>
    </div>
    <el-table
      border
      ref="filterTable"
      :data="allVector"
      style="width: 80%"
      height="600"
      max-height="600"
      stripe
    >
      <el-table-column
        prop="userName"
        label="提交人"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="vectorName"
        label="质粒名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="geneName"
        label="基因名称"
        align="center"
      ></el-table-column>
      <el-table-column label="基因序列" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="getSeq(scope.row.geneSequence)"
            >查看序列</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="RES1"
        label="内切酶1"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="RES2"
        label="内切酶2"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        align="center"
      ></el-table-column>
    </el-table>
    <el-dialog title="序列" :visible.sync="dialogVisible" width="50%">
      {{ dialogText }}</el-dialog
    >
    <div class="back">
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "getVector",
  data() {
    return {
      allVector: null,
      baseVector: null,
      searchText: "",
      dialogVisible: false,
      dialogText: "",
    };
  },
  mounted() {
    this.getAllVector();
  },
  methods: {
    searchVector() {
      let res = this.baseVector.filter((item) => {
        for (let key in item) {
          if (String(item[key]).indexOf(this.searchText) !== -1) {
            return true;
          }
        }
      });
      this.allVector = res;
    },
    async getAllVector() {
      const res = await this.axios.get("vector/getAllVector");
      this.allVector = this.baseVector = res.data.data;
    },
    getSeq(seq) {
      this.dialogText = seq;
      this.dialogVisible = true;
    },
  },
  watch: {
    searchText() {
      if (this.searchText) {
        this.searchVector();
      } else {
        this.getAllVector();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.vector {
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
}
</style>
