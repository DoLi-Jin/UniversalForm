<template>
  <div class="hello">
    <h2>我是引入弹窗的页面</h2>
    <el-button @click="formBoxShow = true">点击弹出弹窗</el-button>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <h2>我是引入弹窗的页面</h2>
    <FormBox v-if="formBoxShow" :formDataObj="formDataObj" @closeForm="closeForm"
    @cancelForm="cancelForm"  @submitForm="submitForm" @uploadRequest="uploadRequest"></FormBox>
  </div>
</template>

<script>
import FormBox from './formBox'

export default {
  name: 'index',
  components:{ FormBox },
  data () {
    return {
      msg: '',
      formBoxShow: false,
      //表格数据对象
      formDataObj: {
        //包含的表格列表数据
        list: {
          // 标题
          title1: {
            type: "title",
            name: "title1",
            value: "这是一个标题",
            noHidden: true,
            style: { "font-size": "20px", "font-weight": "bold","text-align": "left", },
            span: 24,
          },
          // 输入框
          input1: {
            type: "input",
            name: "input1",
            label: "这是输入框",
            value: "输入框",
            placeholder: "请输入",
            disabled: false,
            noHidden: true, //是否不隐藏，为false时候，隐藏并且会参与列表提交
            propArr: [], //有此属性时候，说明此属性必须输入并且验证
            span: 12, //有此属性则使用此属性，否则默认宽度为50%，占用的空间为 24/span
          },
          // 下拉框
          select1: {
            type: "select",
            name: "select1",
            label: "下拉框",
            propArr: [
              { required: true, message: "下拉框不能为空", trigger: "change" }
            ],
            disabled: false,
            noHidden: true,
            value: "1",
            placeholder: "请选择下拉框",
            multiple: false,
            span: 12,
            selectArr: [
              {code: "1",name: "类型1"},
              {code: "2",name: "类型2"},
              {code: "3",name: "类型3"},
            ],
            optionKey: "code",
            optionLabel: "name",
            optionValue: "code"
          },
          // 日期选择框
          date1: {
            type: "date",
            name: "date1",
            label: "日期选择框",
            value: "2018-12-06",
            placeholder: "请输入",
            disabled: false,
            noHidden: true, //是否不隐藏，为false时候，隐藏并且会参与列表提交
            propArr: [
              { required: true, message: "下拉框不能为空", trigger: "change" }
            ], //有此属性时候，说明此属性必须输入并且验证
            span: 12, //有此属性则使用此属性，否则默认宽度为50%，占用的空间为 24/span
          },
          // 复选框
          checkbox1: {
            type: "checkbox",
            name: "checkbox1",
            label: "昨天吃了什么",
            propArr: [
              { required: true, message: "昨天一定吃饭了", trigger: "blur" }
            ],
            disabled: false,
            noHidden: true,
            value: ["4"],
            placeholder: "选择食物",
            span: 12,
            checkboxArr: [
              { code:"1", name: "榴莲" },
              { code:"2", name: "臭豆腐" },
              { code:"3", name: "螺蛳粉" },
              { code:"4", name: "哈士奇" },
            ],
            optionKey: "name",
            optionLabel: "code",
            optionValue: "code",
          },
          // 单选框
          radio1: {
            type: "radio",
            name: "radio1",
            label: "今日菜单",
            propArr: [
              { required: true, message: "没什么选择就 哈士奇？", trigger: "change" }
            ],
            disabled: false,
            noHidden: true,
            value: "",
            placeholder: "请选择单选框",
            span: 24,
            radioArr: [
              { id: "1", name: "大米", disabled: false },
              { id: "2", name: "小米", disabled: false },
              { id: "3", name: "苹果", disabled: false },
              { id: "4", name: "葡萄", disabled: false },
              { id: "5", name: "捷豹", disabled: false },
              { id: "6", name: "哈士奇", disabled: false },
            ],
            optionKey: "name",
            optionLabel: "id",
            optionValue: "id",
          },
          // 上传框
          upload1: {
            type: "upload",
            name: "upload1",
            accept: 'image/jpeg,image/gif,image/png,image/bmp',
            label: "上传框",
            propArr: [
              // { required: true, message: "合同模板不能为空", trigger: ("blur",'change') },
            ],
            label1: "上传",
            disabled: false,
            noHidden: true,
            value: "",
            multiple: false,
            placeholder: "上传个文件吧，但是接口需要修改哦",
            span: 24,
            fileList: [],
            limit: 1,
          },
          // 文本框
          textarea1: {
            type: "textarea",
            name: "textarea1",
            label: "哈士奇烹饪描述",
            propArr: [
              { required: true, message: '要不试试磕碰捷豹？', trigger: 'blur' },
            ],
            disabled: false,
            noHidden: true,
            value: "",
            placeholder: "模板说明为200字符，超过自动截取考前部分",
            span: 24,
            maxlength: 200,
          },
          // 树状图
          tree1: {
            type: "tree",
            name: "tree1",
            label: "辛特勒的名单",
            // propArr: [
            //   { required: true, message: "权限名称不能为空", trigger: "blur" },
            // ],
            disabled: false,
            noHidden: true,
            value: [],
            placeholder: "请选择权限名称",
            span: 24,
            props: {
              children: 'subMenus',
              label: 'name'
            },
            treeArr: [
              {
                id:1, name: "烹饪大全", subMenus: [
                  { id: 10, name: "哈士奇", },
                  { id: 11, name: "二哈", },
                ]
              },
              {
                id:2, name: "磕碰大全", subMenus: [
                  { id: 10, name: "天猫", },
                  { id: 11, name: "捷豹", },
                ]
              }
            ],
            optionKey: "name",
            optionLabel: "id",
            optionValue: "id"
          },

        },
        //页面属性，form中label的宽度
        page: {
          formLabel: {
            width: "120px",
          },
          style:{
            "position":"fixed",
            "height": '50%',
          }
        },
        // 按钮列表
        button: {
          toSubmit: {
            type: "button",
            name: "submit",
            label: "提交",
            noHidden: true,
            value: "提交",
            span: 4,
            offset: 6,
            style:{
              "background": "#fff",
              width: "200px",
            },
          },
          toCancel: {
            type: "button",
            name: "cancel",
            label: "返回",
            noHidden: true,
            value: "返回",
            span: 4,
            offset: 2,
            style:{
              "background": "#fff",
            },
          },
          toClose: {
            type: "button",
            name: "close",
            noHidden: true,
          },
        },
      }
    }
  },
  methods:{
    //关闭按钮被点击
    closeForm(){
      this.formBoxShow = false;
    },
    //返回按钮被点击
    cancelForm(){
      //是否要清空用户已经做的选择，要清空则循环formDataObj.list，然后把所有的value清空就好。
      this.formBoxShow = false;
    },
    //提交按钮被点击
    submitForm(){
      this.formBoxShow = false;
      this.$message.success("提交成功");
      this.closeForm()
    },
    //提交时候替换list中upload的地址和对象数组
    uploadRequest(fileName,response){
      this.formDataObj.list[fileName].fileList = [response]
      this.formDataObj.list[fileName].value = response.url || ''
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{ background: #fff; width:100%; height:100%; position: absolute; left: 0; top: 0; }
</style>
