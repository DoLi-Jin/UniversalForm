<template>
  <div class="formBox" :class="{'noFixed':formDataObj.page && formDataObj.page.style && formDataObj.page.style.position && formDataObj.page.style.position == 'relative'}">
    <div class="formBoxMain" :style="{height: formDataObj.page.style.height || formDataObj.page.style.height }">
      <el-scrollbar style="height: 100%;">
        
        <div class="formForm">
          <!-- 表单之前的表格插槽 -->
          <slot name="formBeforeTable"></slot>
           <el-form
            status-icon
            :model="formDataObj.list"
            ref="formDataObj"
            :label-width="formDataObj.page && formDataObj.page.formLabel && formDataObj.page.formLabel.width || '100px'"
            class="demo-tableBoxRuleForm"
          >
          <el-row>
            <el-col :span="item.span || 12" v-for="item in formDataObj.list" :key="item.name">
              <!-- 自定义标题 -->
              <div class="title" v-if="item.type === 'title' && item.noHidden" :style="item.style"
              >{{item.value}}
              <!-- <span :style="item.underLine && {'border-bottom':'1px solid '+item.color,}"></span> -->
              </div>
              <!-- 表格label显示，label宽度在 formDataObj.page.formLabel.width 属性设置，默认100px-->
              <el-form-item
                :label="item.label"
                :prop="item.name+'.value'"
                :rules="item.propArr && item.propArr"
                v-if="item.noHidden"
              >
                <!-- 输入框 -->
                <el-input
                  suffix-icon="el-icon-date"
                  v-if="item.type === 'input'"
                  :style="(item.verification || item.infoNum) && {width: '50%', float: 'left'}"
                  v-model="item.value"
                  :show-password="item.name == 'password'"
                  :maxlength="item.maxlength && item.maxlength"
                  :placeholder="item.placeholder"
                  :disabled="item.disabled"
                ></el-input>
                <!-- 下拉框 -->
                <el-select
                  v-if="item.type === 'select'"
                  :multiple="item.multiple"
                  v-model="item.value"
                  :placeholder="item.placeholder"
                  :disabled="item.disabled"
                  >
                  <el-option
                    v-for="itm in item.selectArr"
                    :key="itm[item.optionKey]"
                    :label="itm[item.optionLabel]"
                    :value="itm[item.optionValue]"
                    :disabled="itm.disabled"
                  ></el-option>
                </el-select>
                <!-- 日期选择框 -->
                <el-date-picker
                  v-if="item.type === 'date'"
                  v-model="item.value"
                  :placeholder="item.placeholder"
                  :disabled="item.disabled"
                  :editable="true">
                </el-date-picker>
                <!-- 单选框 -->
                <el-radio-group
                  v-model="item.value"
                  :disabled="item.disabled"
                  v-if="item.type === 'radio'"
                  >
                  <el-radio
                    v-for="itm in item.radioArr"
                    :key="itm[item.optionKey]"
                    :label="itm[item.optionValue]"
                    :disabled="itm.disabled"
                  >{{itm[item.optionLabel]}}</el-radio>
                </el-radio-group>
                <!-- 复选框 -->
                <el-checkbox-group
                  v-model="item.value"
                  :disabled="item.disabled"
                  v-if="item.type === 'checkbox'"
                  >
                  <el-checkbox v-for="(itm) in item.checkboxArr" 
                    :label="itm[item.optionValue]" 
                    :key="itm[item.optionKey]"
                    :disabled="itm.disabled"
                  >
                  {{itm[item.optionLabel]}}
                  </el-checkbox>
                </el-checkbox-group>
                <!-- 上传框 -->
                <span v-if="item.type === 'upload'" class="spanInput" :style="item.disabled && {
                  'border-bottom-right-radius': '5px',
                  'border-top-right-radius': '5px',
                  width:(item.disabled ? '100%' : '70%')
                  }">
                  <a :href="item.value && item.value" target="_blank">
                    {{item.value && item.value || ""}}
                    <!-- <span v-if="item.fileList && item.fileList[0] && item.fileList[0].url">点击下载</span> -->
                  </a>
                  <b v-if="!item.disabled && item.fileList && item.fileList[0] && item.fileList[0].url" class="el-icon-error" @click="removeFileList(item)">
                  </b>
                </span>
                <el-upload
                  :style="item.disabled && {
                  width:(item.disabled ? '0' : '30%')
                  }"
                  v-if="item.type === 'upload'"
                  v-show="!item.disabled"
                  :accept="item.accept"
                  action=""
                  :http-request="httpRequest">
                  <span class="spanUpload" @click="stockpileFileName(item)">
                    {{item.label1}}
                  </span>
                </el-upload>
                 <!-- 文本框 -->
                <el-input type="textarea" v-model="item.value"
                  v-if="item.type === 'textarea'"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  :maxlength="item.maxlength && item.maxlength"
                  :placeholder="item.placeholder"
                  :disabled="item.disabled"
                  >
                </el-input>
                <!-- 树状图 -->
                <el-tree
                  :default-expanded-keys="[1,2,3,4,5,6,7]"
                  :check-on-click-node="true"
                  v-if="item.type === 'tree'"
                  :data="item.treeArr"
                  show-checkbox
                  :node-key="item.treeKey"
                  :default-checked-keys="item.value"
                  :props="item.props"
                  ref="trees">
                </el-tree>
              </el-form-item>
            </el-col>
          </el-row>
          </el-form>
          <!-- 表单之前的表格插槽 -->
          <slot name="formBeforeTable"></slot>
          <el-row class="buttons">
            <el-col v-if="formDataObj.button && formDataObj.button.toSubmit && formDataObj.button.toSubmit.name === 'submit'"
              v-show="formDataObj.button && formDataObj.button.toSubmit.noHidden" 
              :span="formDataObj.button.toSubmit.span && formDataObj.button.toSubmit.span" :offset="formDataObj.button.toSubmit.offset">
              <!-- 提交按钮 -->
              <el-button
                class="submit"
                :style="formDataObj.button.toSubmit.style"
                :disabled="formDataObj.page.userAgreement && formDataObj.page.userAgreement.noHidden && !formDataObj.page.userAgreement.value"
                @click="submitForm('formDataObj')"
              >{{formDataObj.button.toSubmit.label}}</el-button>
            </el-col>
            <el-col v-if="formDataObj.button && formDataObj.button.toCancel && formDataObj.button.toCancel.name === 'cancel'"
              v-show="formDataObj.button && formDataObj.button.toCancel.noHidden"
              :span="formDataObj.button.toCancel.span && formDataObj.button.toCancel.span" :offset="formDataObj.button.toCancel.offset">
              <!-- 返回按钮 -->
              <el-button
                class="cancel"
                @click="cancelForm('formDataObj')"
              >{{formDataObj.button.toCancel.label}}</el-button>
            </el-col>
            <!-- 自定义按钮 -->
            <slot name="addsBtn"></slot>
          </el-row>
          <!-- 关闭按钮 -->
          <span
            v-if="formDataObj.button && formDataObj.button.toClose && formDataObj.button.toClose.name === 'close'"
            v-show="formDataObj.button && formDataObj.button.toClose.noHidden"
            class="el-icon-close close"
            @click="closeForm"
          ></span>
        </div>
        
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'formBox',
  props:[ "formDataObj" ],
  data () {
    return {
      //用来储存上传的数据的name的属性
      fileName: "",
    }
  },
  methods: {
    //图片上传
    httpRequest(params){
      let formData = new FormData()
      const file = params.file
      formData.append('file',file)
      formData.append('access_token',this.$cookie.get("access_token"))
      PostFilesAnon(formData)
      .then((response)=>{
        if(response.data.resp_code == 200){
          this.$emit('uploadRequest',this.fileName,response.data.data)
          // this.formDataObj.list[this.fileName].fileList = [response.data.data]
          // this.formDataObj.list[this.fileName].value = response.data.data.url || ''
        }else{
          this.$message.error('图片修改失败，请联系管理员'); 
        }
      })
    },
    //储存当前的name
    stockpileFileName(item){
      this.fileName = item.name
    },
     // 关闭此页面
    closeForm() {
      this.$emit('closeForm')
    },
    //提交按钮被点击
    submitForm(formName) {
      this.formDataObj.list.statusDesc && (this.formDataObj.list.statusDesc.propArr[0].required = false);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('submitForm')
        } else {
          this.$message.error("输入信息有误，请检查您的输入信息");
          return false;
        }
      });
    },
    // 返回按钮被点击
    cancelForm(formName) {
      this.$emit('cancelForm')
    },
  },
}
</script>
<style scoped>
  .formBox{ width: 100%; height: 100%; line-height: 1; 
  position: fixed; justify-content: center; align-items: center; display: flex; z-index: 101; top: 0; left: 0;
   background: rgba(256, 256, 256, 0.5); }
  .noFixed{ position: relative;  }
  .formBoxMain{ width: 80%; height: 80%; box-sizing: border-box; background: #fff;
  border-radius: 10px; border: 1px solid #ddd; box-shadow: 0 2px 6px 0 rgba(0,0,0,.1) }
  .noFixed .formBoxMain{ width: 100%; height: 100%; border-radius: 0; border: 0; box-shadow: none; }
  .formForm{ min-height: 200px; }
  .formBox >>> .el-scrollbar__wrap{
    padding: 20px; box-sizing: border-box; overflow-x: hidden;
  }
  .noFixed >>> .el-scrollbar__wrap{ padding: 0; }
  /* 修改输入框的高度 */
  .formBox >>> .el-input__inner{ height: 30px; line-height: 30px; }
  .formBox .el-select, .el-input { width: 100%; }
  .formBox .el-checkbox-group, .formBox .el-radio-group { text-align: left;}

  /* 自定义上传列表样式修改 */
  .formBox >>> .spanInput{
    border: 1px solid #ddd;
    margin-top: 5px;
    padding: 0 15px;
    box-sizing: border-box;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    display: block;
    float: left;
    width: 60%;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
  }
  .formBox >>> .spanInput b{
    width: 10px;
    height: 10px;
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px 5px;
    color: #666;
    font-weight: normal;
  }
  .formBox >>> .spanInput a{
    position: relative;
    display: block;
    color: #666;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }
  .formBox >>> .spanInput a span{
    position: absolute;
    right: 30px;
    top: 0;
  }
  .formBox >>> .spanInput a:hover{
    color: #409EFF;
    cursor: pointer;
  }
  /* 上传按钮样式修改 */
  .formBox >>> .spanUpload{
    color: #409EFF;
    border: 1px solid #ddd;
    margin-top: 5px;
    border-left: 0;
    padding: 0 15px;
    box-sizing: border-box;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    display: block;
    float: left;
    width: 100%;
    display: block;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .formBox >>> .spanUpload:hover{
    color: #fff;
    background: #409EFF;
    border: 1px solid #409EFF;
  }
  .formBox >>> .el-upload{
    width: 40%;
  }
  .formBox >>> .el-upload-list{
    display: none;
  }

  .close {
    font-size: 18px;
    font-weight: 500;
    position: absolute;
    z-index: 10;
    right: 10px;
    top: 10px;
    cursor: pointer;
    font-weight: 600;
  }


  /* .formBox >>> .el-form-item:nth-child(2n+1){ padding-left: 10px; } */
  .formBox >>> .el-form-item:first-child{ padding: 0 10px; }
  p{height: 100px; background: #aaaaaa;}
  p:nth-child(3n+3){height: 200px; background: #ddd;}
</style>

