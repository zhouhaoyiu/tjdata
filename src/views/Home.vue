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
          <div class="lineTitle">提交人<span class="red">*</span></div>
          <el-input disabled v-model="primerForm.userName"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">订购日期<span class="red">*</span></div>
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
          <div class="lineTitle">引物名称<span class="red">*</span></div>
          <el-input v-model="primerForm.primerName"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">碱基序列<span class="red">*</span></div>
          <el-input v-model="primerForm.baseSequence"></el-input>
        </div>
      </div>
      <div class="dialog" v-if="dialogTitle === '提交质粒数据'">
        <div class="dialogLine">
          <div class="lineTitle">提交人<span class="red">*</span></div>
          <el-input disabled v-model="vectorForm.userName"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">载体名称<span class="red">*</span></div>
          <el-select
            v-model="vectorForm.vectorName"
            filterable
            allow-create
            default-first-option
          >
            <el-option
              v-for="item in getVectorSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">基因名称<span class="red">*</span></div>
          <el-input v-model="vectorForm.geneName"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">基因序列<span class="red">*</span></div>
          <el-input v-model="vectorForm.geneSequence"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">内切酶1</div>
          <el-select v-model="vectorForm.RES1">
            <el-option
              v-for="item in getResSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">内切酶2</div>
          <el-select v-model="vectorForm.RES2">
            <el-option
              v-for="item in getResSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">描述</div>
          <el-input v-model="vectorForm.description"></el-input>
        </div>
      </div>
      <div class="dialog" v-if="dialogTitle === '提交订购单'">
        <div class="dialogLine">
          <div class="lineTitle">提交人<span class="red">*</span></div>
          <el-input disabled v-model="orderForm.userName"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">订购日期<span class="red">*</span></div>
          <el-date-picker
            disabled
            v-model="orderForm.orderDate"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">商品名称<span class="red">*</span></div>
          <el-input v-model="orderForm.orderName"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">品牌要求</div>
          <el-select
            v-model="orderForm.brand"
            filterable
            allow-create
            default-first-option
          >
            <el-option
              v-for="item in getOrderSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">规格<span class="red">*</span></div>
          <el-input v-model="orderForm.specification"></el-input>
        </div>
        <div class="dialogLine">
          <div class="lineTitle">数量<span class="red">*</span></div>
          <el-input-number
            v-model="orderForm.amount"
            :min="1"
            :max="1000"
            label="数量"
          >
          </el-input-number>
        </div>
        <div class="dialogLine">
          <div class="lineTitle" @click="showInfo">备注（淘宝链接）</div>
          <el-input v-model="orderForm.description"></el-input>
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
        userName: this.$store.state.userName,
        orderDate: "",
        primerName: "",
        baseSequence: "",
      },

      vectorForm: {
        userName: this.$store.state.userName, //提交人
        vectorName: "", // 载体名称
        geneName: "", // 基因名称
        geneSequence: "", // 基因序列
        RES1: "", // 内切酶1
        RES2: "", // 内切酶2
        description: "", // 描述
      },

      orderForm: {
        userName: this.$store.state.userName, //提交人
        orderDate: new Date(), // 订购时间
        orderName: "", // 商品名称
        brand: "", // 品牌要求
        specification: "", // 规格
        amount: "", // 数量
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
          name: "提交质粒数据",
          type: "primary",
        },
        {
          name: "查询引物数据",
          type: "default",
          path: "primer",
        },
        {
          name: "查询质粒数据",
          type: "default",
          path: "vector",
        },
        {
          name: "提交订购单",
          type: "primary",
          path: "order",
        },
        {
          name: "查询订购信息",
          type: "default",
          path: "order",
        },
      ],
      RES: [
        "无",
        "Aat II",
        "Acc I",
        "Acc II (FunD II)",
        "Acc III (BspM II)",
        "Afa I (Rsa I)",
        "Afl II",
        "Alu I",
        "Aor13H I (BspM II, Acc III)",
        "Aor51H I (Eco47 III)",
        "Apa I",
        "ApaL I",
        "Bal I",
        "BamH I",
        "Ban II (HgiJ II)",
        "BciT130 I (EcoR II, Mva I)",
        "Bcn I (Cau II)",
        "Bgl I",
        "Bgl II",
        "Bln I (Avr II)",
        "Bme T110 I (Ava I)",
        "Bpu1102 I (Esp I)",
        "Bsp1286 I (Sdu I)",
        "Bsp1407 I",
        "BspT104 I (Asu II, Nsp V)",
        "BspT107 I (HgiC I)",
        "BssH II (BseP I)",
        "Bst1107 I (Sna I)",
        "BstP I (BstE II, EcoO65 I)",
        "BstX I",
        "Cfr10 I",
        "Cla I",
        "CpoI (Rsr II)",
        "Dde I",
        "Dpn I",
        "Dra I (Aha III)",
        "Eae I (Cfr I)",
        "Eco52 I (Xma III)",
        "Eco81 I (Sau I)",
        "EcoO109 I (Dra II)",
        "EcoO65 I (BstE II, BstP I)",
        "EcoR I",
        "EcoR V",
        "EcoT14 I (Sty I)",
        "EcoT22 I (Ava III)",
        "Fba I (Bcl I)",
        "Fok I",
        "Hae II",
        "Hae III",
        "Hap II (Hpa II,Msp I)",
        "Hha I",
        "Hin1 I (Acy I,Bbi II)",
        "Hinc II (Hind II)",
        "Hind III",
        "Hinf I",
        "Hpa I",
        "Kpn I",
        "Mbo I (Sau3A I)",
        "Mbo II",
        "Mfl I (Xho II)",
        "Mlu I",
        "Msp I (Hpa II,Hap II)",
        "Mun I (Mfe I)",
        "Nae I",
        "Nco I",
        "Nde I",
        "Nhe I",
        "Not I",
        "Nru I",
        "PmaC I",
        "Psp1406 I (Acl I)",
        "Pst I",
        "Pvu I",
        "Pvu II",
        "RspRS II (Mse I)",
        "Sac I",
        "Sac II",
        "Sal I",
        "Sau3A I (Mbo I)",
        "Sca I",
        "Sfi I",
        "Sma I",
        "Smi I (Swa I)",
        "SnaB I",
        "Spe I",
        "Sph I",
        "Sse8387 I",
        "Ssp I",
        "Stu I",
        "Taq I (TthHB8 I)",
        "Van91 I (PflM I)",
        "VpaK11B I (Ava II)",
        "Xba I",
        "Xho I",
        "Xsp I (Bfa I, Mae I)",
      ],
      VECTOR: [
        "pMD-19T",
        "pMD-18T",
        "pGADT7",
        "pGBKT7",
        "pET-14b",
        "pCold",
        "cLUC",
        "nLUC",
        "pSOS",
        "p1665",
        "p1666",
      ],
      ORDER: [
        "",
        "淘宝",
        "麦克林",
        "阿拉丁",
        "拼多多",
        "Takara",
        "ThermoFisher",
        "Sigma",
      ],
    };
  },

  methods: {
    showInfo() {
      console.log(JSON.stringify(this.orderForm, 0, 2));
    },
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
            this.primerForm = {
              userName: this.$store.state.userName,
              orderDate: "",
              primerName: "",
              baseSequence: "",
            };
            // this.dialogVisible = false;
          } else {
            this.$message.error(res.data.msg);
          }
        } else {
          this.$message.error("数据不能为空");
        }
      }
      if (this.dialogTitle === "提交质粒数据") {
        // console.log(this.vectorForm);
        let {
          userName,
          vectorName,
          geneName,
          geneSequence,
          RES1,
          RES2,
          description,
        } = this.vectorForm;
        if (
          userName &&
          vectorName &&
          geneName &&
          geneSequence &&
          RES1 &&
          RES2
        ) {
          const res = await this.axios.post("vector/addVector", {
            userName: userName,
            vectorName: vectorName,
            geneName: geneName,
            geneSequence: geneSequence,
            RES1: RES1,
            RES2: RES2,
            description: description,
          });
          if (res.data.code === "0") {
            this.$message.success(res.data.msg);
            this.vectorForm = {
              userName: this.$store.state.userName, //提交人
              vectorName: "", // 载体名称
              geneName: "", // 基因名称
              geneSequence: "", // 基因序列
              RES1: "", // 内切酶1
              RES2: "", // 内切酶2
              description: "", // 描述
            };
            // this.dialogVisible = false;
          } else {
            this.$message.error(res.data.msg);
          }
        } else {
          this.$message.error("数据不能为空");
        }
      }
      if (this.dialogTitle === "提交订购单") {
        // console.log(this.orderForm);
        let {
          userName,
          orderDate,
          orderName,
          brand,
          specification,
          amount,
          description,
        } = this.orderForm;
        if (orderDate)
          if (userName && orderDate && orderName && amount && specification) {
            const res = await this.axios.post("order/addOrder", {
              userName: userName,
              orderDate: orderDate,
              orderName: orderName,
              brand: brand || " ",
              specification: specification,
              amount: amount,
              description: description || " ",
            });
            if (res.data.code === "0") {
              this.$message.success(res.data.msg);
              this.orderForm = {
                userName: this.$store.state.userName, //提交人
                orderDate: new Date(), // 订购时间
                orderName: "", // 商品名称
                brand: "", // 品牌要求
                specification: "", // 规格
                amount: "", // 数量
                description: "", // 描述
              };
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
  mounted() {
    if (!this.$store.state.ticket) {
      this.$router.push("/login");
    }

    console.log("CODE BY ZHY");
  },
  computed: {
    getResSelect() {
      return this.RES.map((item) => ({
        label: item,
        value: item,
      }));
    },
    getVectorSelect() {
      return this.VECTOR.map((item) => ({
        label: item,
        value: item,
      }));
    },
    getOrderSelect() {
      return this.ORDER.map((item) => ({
        label: item,
        value: item,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
.red {
  color: red;
  padding: 0px 2px;
}
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
