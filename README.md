所有内容基于vue+element-ui
快速生成表单弹窗(表单组件)的一个测试版。
包含了输入框、多选框、树状图、多选框、单选框、文本框等(全部基于element-ui)。
每个可输入的数据全部都可以动态的设置宽度、是否可输入(disabled)、是否隐藏(noHidden)、动态输入值、动态标题、动态设置特定样式、动态输入placeholder、动态设置可输入字数、动态设置附带数组(例如多选框的key，value等)。

## 详细功能配置

``` bash
1、formDataObj对象
    是所有代码的总集合，也是props传输的主要内容;

2、fileName
    辅助作用，储存的现在上传文件时候的对象的name属性，之后第二版会废弃(所以暂时先写上);

3、formDataObj.page对象
    页面中的主要内容设置;
    formDataObj.page.formLabel; 
        此属性下面可以设置一个width属性，用来控制此页面所有的表单的label的长度，默认是120px;
    formDataObj.page.style ;
        此属性下面可以设置一个position属性，用来控制组件是页面内容一部分(relative)或者是弹窗表格(fixed)，默认是relative;
        eg: 
        page: {
            formLabel: {
                width: "120px",
            },
            style:{
                "position":"fixed"
            }
        };
4、formDataObj.button对象
    里面是按钮列表，里面的name全是固定的，包含四类，
    提交(name是toSubmit，使用时表单需要进行验证，默认文字是提交，位置在页面底部)
    返回(name是toCancel，使用时表单不需要进行验证，默认文字是返回，位置在页面底部)
    关闭(name是toClose，使用时表单不需要进行验证，默认文字是关闭，位置在页面左上部，符号是x)
    自定义按钮(预留name是addsBtn的插槽)

5、formDataObj.list对象(重要!!!)
    此对象里面的所有表单和标题内容，都会循环渲染到页面中

6、formDataObj.list.title(n)
    表单标题，title(n)可更换成随意名字，只要保持type是title即可
    eg: 
    title1: {
        type: "title",
        name: "title1",
        value: "这是一个标题",
        noHidden: true,
        style: { "font-size": "20px", "font-weight": "bold","text-align": "left", },
        span: 24,
    },
7、formDataObj.list.input(n)
    表单输入框，input(n)可更换成随意名字，只要保持type是input即可
    eg: 
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
8、formDataObj.list.select(n)
    select(n)可更换成随意名字，只要保持type是input即可
    eg: 
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

999手册（功能字典）:

声明: 对象的key和name必须一样(重要!!!);

type: 判断这个是什么类型(例如:input，select等);

label:输入框左边的标题，为空时候不显示;

value: 根据type类型决定，可以是任何类型，是和用户交互的值(input时候输入的值，select时候选择的key);

noHidden: true时候不隐藏，为false时候隐藏(控制display属性);

disabled: true时候不可输入，输入框变灰，false时候输入框正常显示(等同于原生的disabled属性);

span: 参考element-ui的栅格布局;

propArr:为一个数组，如果其中有正则对象，那么则按照正则对象进行校验(在提交按钮点击时候，也会根据此属性进行非空判断等操作);

style: 自定义css样式;

multiple:下拉框时候是否可以多选，类似属性都可以在组件和父组件进行定制，具体方法请参考element-ui中的属性;

selectArr:下拉框中的数组，里面包含的对象是下拉框中循环展示的内容(和此属性类似的有单选框和多选框中等的数组);

optionKey:下拉框中的 key标识，对应的是数组中要展示的label和标识value;

optionLabel:下拉框中的 label标识，对应的是数组中要展示的label和标识value;

optionValue:下拉框中的 value标识，对应的是数组中要展示的label和标识value;
















```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
