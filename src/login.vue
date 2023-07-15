<template>
  <div class="login">
    <div class="login_form">
      <div class="login_content">
        <div class="flex_center login_content_mt">
          <div>
            <h2>欢迎登录</h2>
          </div>
        </div>
        <div style="margin-top: 40px">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item label="账号" prop="name">
              <el-input style="width: 75%" v-model="ruleForm.name" />
            </el-form-item>

            <el-form-item label="密码" prop="name">
              <el-input style="width: 75%" v-model="ruleForm.password" />
            </el-form-item>

            <el-form-item label="" prop="status">
              <label class="login_content_check">
                <input v-model="ruleForm.status" type="checkbox" />
                <span class="login_content_checkmark"
                  ><el-icon><Check /></el-icon
                ></span>
              </label>
              <span>是否同意:<a class="a_href" href="#">《用户隐私政策》</a></span>
            </el-form-item>

            <el-form-item>
              <div>
                <el-button class="iw1" @click="resetForm(ruleFormRef)">取消</el-button>
                <el-button
                  class="iw1"
                  v-if="data.showBut"
                  type="primary"
                  @click="submitForm(ruleFormRef)"
                  >确认
                </el-button>
                <el-button class="iw1" v-else type="primary" loading>登录中</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <p v-if="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from './stores/user'
import { useRouter } from 'vue-router'
import axios from 'axios'
import OpenForm from './components/open-form/openForm.vue'
import { reactive, ref } from 'vue'
const router = useRouter()
const data = reactive({
  showBut: true
})

const ruleForm = reactive({
  name: '',
  password: null,
  status: null
})

const rules = reactive({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 1, max: 7, message: '最少为1位数，最长为7位数', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '最少为6位数，最长为16位', trigger: 'blur' }
  ]
})
const ruleFormRef = ref()
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      router.push({name:'Home'})
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`
}))

const userStore = useUserStore()
const loginForm = reactive({ username: '', password: '' })
const error = ref('')

const login = async () => {
  try {
    const response = await axios.post('/api/auth/login', loginForm)

    userStore.setToken(response.data.token)
    userStore.setName(loginForm.username)
    router.push({ name: 'Home' })
  } catch (err) {
    console.error('Failed to login', err)
    error.value = 'Failed to login'
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url('./assets/login.jpeg');
  background-size: cover;
  background-position: center center;

  .login_form {
    width: 25%;
    aspect-ratio: 4 / 3;
    background-color: #fff;
    border-radius: 8px;

    .login_content {
      .login_content_mt {
        margin-top: 40px;
      }

      .login_content_check input {
        display: none;
      }

      /* 自定义复选框 */
      .login_content_check .login_content_checkmark {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 15px;
        height: 15px;
        border: 1px solid #c8c9cc;
        border-radius: 50%; /* 圆形样式 */
        margin-right: 5px;
        line-height: 18px;
        text-align: center;
        color: transparent;
        transition: background-color 0.3s, color 0.3s;
      }

      /* 当复选框被选中时更改样式 */
      .login_content_check input:checked + .login_content_checkmark {
        background-color: #409eff; /* 更改背景色 */
        color: #fff; /* 更改文字色 */
        border-color: #409eff; /* 更改边框色 */
      }
    }
  }
}
</style>
