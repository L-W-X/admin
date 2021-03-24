<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-row :gutter="10">
      <el-col :span="2">
        <div class="grid-content bg-purple">Recipient：</div>

        <div class="grid-content bg-purple">
          <el-radio v-model="radio1" label="1">Booker</el-radio>
        </div>

        <div class="grid-content bg-purple">
          <el-radio v-model="radio1" label="2">Contact</el-radio>
        </div>

        <div class="grid-content bg-purple">
          <el-radio v-model="radio1" label="3">Guest</el-radio>
        </div>

        <div class="grid-content bg-purple">
          <el-radio v-model="radio1" label="4">Others</el-radio>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">Prefix:</div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputPrefix[0]" disabled />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputPrefix[1]" disabled />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputPrefix[2]" disabled />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputPrefix[3]" disabled />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">Title:</div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputTitle[0]" disabled />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputTitle[1]" disabled />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputTitle[2]" disabled />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputTitle[3]" disabled />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">First name</div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputFn[0]" />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputFn[1]" />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputFn[2]" />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputFn[3]" />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">last name</div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputLn[0]" />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputLn[1]" />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputLn[2]" />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="inputLn[3]" />
        </div>
      </el-col>
      <el-col
        :span="6"
      ><div class="grid-content bg-purple">E-mail Adress</div>
        <div class="grid-content bg-purple">
          <el-input v-model="email[0]" disabled />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="email[1]" disabled />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="email[2]" disabled />
        </div>
        <div class="grid-content bg-purple">
          <el-input v-model="email[3]" disabled />
        </div> </el-col>
    </el-row>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      radio1: '',
      inputPrefix: ['Mrs', 'Mrs', 'Mrs', 'Mrs'],
      inputTitle: ['Dr', 'Dr', 'Dr', 'Dr'],
      inputFn: ['', '', '', ''],
      inputLn: ['', '', '', ''],
      email: [
        '1327783@qq.com',
        '1327783@qq.com',
        '1327783@qq.com',
        '1327783@qq.com'
      ],
      selectData: {
        inputPrefix: '',
        inputTitle: '',
        inputFn: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  watch: {
    radio1(val) {
      switch (val) {
        case '1':
          this.select(0)
          break
        case '2':
          this.select(1)
          break
        case '3':
          this.select(2)
          break
        case '4':
          this.select(3)
          break
      }
    }
  },
  methods: {
    select(val) {
      this.selectData = {
        inputPrefix: this.inputPrefix[val],
        inputTitle: this.inputTitle[val],
        inputFn: this.inputFn[val],
        email: this.email[val]
      }
    },
    submit() {
      if (!this.radio1) {
        this.$message({
          message: '未选择必选项',
          type: 'warning'
        })
      } else {
        console.log(this.selectData)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
	&-container {
		margin: 30px;
	}
	&-text {
		font-size: 30px;
		line-height: 46px;
	}
}
.el-row {
	margin-bottom: 20px;
	&:last-child {
		margin-bottom: 0;
	}
}
.el-col {
	border-radius: 4px;
	display: flex;
	height: 250px;
	flex-direction: column;
	justify-content: space-between;
}

.grid-content {
	border-radius: 4px;
	line-height: 36px;
	padding-left: 20px;
	min-height: 36px;
}
.row-bg {
	padding: 10px 0;
}
</style>
