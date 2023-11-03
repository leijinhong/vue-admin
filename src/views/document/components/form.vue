<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "./rule";
import { usePublicHooks } from "../hooks";
import { useUserStoreHook } from "@/store/modules/userStore";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import CaretBottom from "@/assets/svg/caret_bottom.svg?component";
import { onMounted } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";

const { list } = useUserStoreHook();

const userList = ref([]);
interface FormType {
  id?: number;
  name: string;
  title: string;
  format: string;
  size: string;
  nickname: string;
}
interface FormPropsType<T = any> {
  formInline: T;
}
const props = withDefaults(defineProps<FormPropsType<FormType>>(), {
  formInline: () => ({
    title: "",
    name: "",
    format: "",
    size: "",
    nickname: ""
  })
});

const fileList = ["我的资料夹", "公共资料夹"].map((label, value) => ({
  label,
  value
}));
const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

onMounted(async () => {
  userList.value = await list;
});
defineExpose({ getRef });
</script>

<template>
  <el-form
    class="mt-4"
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-row :gutter="30" v-if="newFormInline.title != '上传'">
      <re-col>
        <el-form-item
          :label="newFormInline.title == '新增' ? '位置' : '原位置'"
          prop="nickname"
        >
          <el-select
            v-model="newFormInline.nickname"
            placeholder="文件位置"
            :disabled="newFormInline.title == '改名'"
            class="!w-full"
            clearable
            :suffix-icon="useRenderIcon(CaretBottom)"
          >
            <el-option
              v-for="item in fileList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item label="文件名" prop="code">
          <el-input
            v-model="newFormInline.code"
            clearable
            placeholder="请输入文件名"
          />
        </el-form-item>
      </re-col>
    </el-row>
    <el-row :gutter="30" v-else>
      <re-col>
        <el-upload
          class="upload-demo"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">拖动文件置此上传</div>
          <template #tip>
            <div class="el-upload__tip">
              支持单个或批量文件上传，支持格式：.pdf .doc .docx .rar
              .zip单个文件不超过20M
            </div>
          </template>
        </el-upload>
      </re-col>
    </el-row>
  </el-form>
</template>
