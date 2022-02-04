<template>
  <div class="home">
    <div class="topInfo">
      <div>提交你的数据</div>
      <div>———————————— by 史</div>
    </div>
    <div class="pic">
      <img
        width="400px"
        height="400px"
        :src="require('../assets/bopic.jpg')"
        alt=""
      />
    </div>
    <div class="btns">
      <el-button
        :type="btn.type"
        v-for="(btn, btnIndex) in btnArray"
        :key="btnIndex"
        @click="openDialog(btn)"
      >
        {{ btn.name }}
      </el-button>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <div class="dialog" v-if="dialogTitle === '提交引物数据'">
        <div class="dialogLine">
          <div class="lineTitle">提交人</div>
          <el-input v-model="primerForm.userName"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">订购日期</div>
          <el-date-picker
            v-model="primerForm.orderDate"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">引物名称</div>
          <el-input v-model="primerForm.primerName"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">碱基序列</div>
          <el-input v-model="primerForm.baseSequence"></el-input>
        </div>
      </div>
      <div class="dialog" v-if="dialogTitle === '提交载体数据'">
        <div class="dialogLine">
          <div class="lineTitle">载体名称</div>
          <el-input v-model="vectorForm.vectorName"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">基因名称</div>
          <el-input v-model="vectorForm.geneName"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">基因序列</div>
          <el-input v-model="vectorForm.geneSequence"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">内切酶1</div>
          <el-input v-model="vectorForm.RES1"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">内切酶2</div>
          <el-input v-model="vectorForm.RES2"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">描述</div>
          <el-input v-model="vectorForm.description"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
// import bopic from "../assets/bopic.jpg";
export default {
  name: "Home",
  data() {
    return {
      dialogTitle: "",
      dialogVisible: false,

      primerForm: {
        userName: "",
        orderDate: "",
        primerName: "",
        baseSequence: "",
      },

      vectorForm: {
        vectorName: "", // 载体名称
        geneName: "", // 基因名称
        geneSequence: "", // 基因序列
        RES1: "", // 内切酶1
        RES2: "", // 内切酶2
        description: "", // 描述
      },

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },

      btnArray: [
        {
          name: "提交引物数据",
          type: "primary",
        },
        {
          name: "查询引物数据",
          type: "default",
          path: "primer",
        },
        {
          name: "提交载体数据",
          type: "primary",
        },
        {
          name: "查询载体数据",
          type: "default",
          path: "vector",
        },
      ],
    };
  },
  methods: {
    openDialog(btn) {
      if (btn.type === "primary") {
        this.dialogVisible = true;
        this.dialogTitle = btn.name;
      } else {
        this.$router.push(btn.path);
      }
    },
    async sendForm() {
      if (this.dialogTitle === "提交引物数据") {
        // console.log(this.primerForm);
        let { userName, orderDate, primerName, baseSequence } = this.primerForm;
        if (userName && orderDate && primerName && baseSequence) {
          const res = await this.axios.post("primer/addPrimer", {
            userName: userName,
            orderDate: orderDate,
            primerName: primerName,
            baseSequence: baseSequence,
          });
          if (res.data.code === "0") {
            this.$message.success(res.data.msg);
            this.primerForm = {};
            // this.dialogVisible = false;
          } else {
            this.$message.error(res.data.msg);
          }
        } else {
          this.$message.error("数据不能为空");
        }
      }
      if (this.dialogTitle === "提交载体数据") {
        // console.log(this.vectorForm);
        let { vectorName, geneName, geneSequence, RES1, RES2, description } =
          this.vectorForm;
        if (vectorName && geneName && geneSequence && RES1 && RES2) {
          const res = await this.axios.post("vector/addVector", {
            vectorName: vectorName,
            geneName: geneName,
            geneSequence: geneSequence,
            RES1: RES1,
            RES2: RES2,
            description: description,
          });
          if (res.data.code === "0") {
            this.$message.success(res.data.msg);
            this.vectorForm = {};
            // this.dialogVisible = false;
          } else {
            this.$message.error(res.data.msg);
          }
        } else {
          this.$message.error("数据不能为空");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .topInfo {
    width: 100%;
    height: 20rem;
    // background: red;
    font-size: 4rem;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .pic {
    height: 400px;
  }
  .btns {
    padding: 80px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .dialog {
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
