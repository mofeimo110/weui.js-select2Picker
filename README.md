# weui.js-select2Picker
# 必须的引用：
#### .[weui.js](https://github.com/Tencent/weui.js)
#### .[jquery](https://github.com/jquery/jquery)

# 说明
**pickerfrom**：被点击控件的属性，表明picker生成的items的数据来源，此属性的使用jquery的选择器写法。

**pickerdisabled**：被点击控件的类，表示当前点击的控件不可用，点击时会阻止picker的弹出

| 方法 | 参数 | 类型 | 说明 |
| --- | --- | --- | --- |
| init | | | 为当前页面的控件注册change和click事件 |
| initSelectChange | | | 注册select的change事件 |
| initPcikerClick | | | 注册可视控件的click事件 |
| showPicker | | | 显示picker |
| | dom | <code>string</code> | 与点击控件关联的select |
| | items | <code>array</code> | pciker的items |
| | options | <code>object</code> | pciker的可配置项 |
| uniqueOptions | | | 将生成的items去重 |
| | values | <code>array</code> | 将要去重的pciker.items数组 |
| initPickerOptions | | | 创建picker的items |
| | dom | <code>string</code> | 与点击控件关联的select |
| option2Picker | | | 将option转变为item对象 |
| | parent | <code>string</code> | 将要生成item的select |
| getSelectValue | | | 获取select当前的值 |
| | dom | <code>string</code> | 需要取值的select |
| setValue | | | 给控件赋值 |
| | target | <code>string</code> | 需要赋值的控件 |
| | val | <code>string</code> | 控件的值 |

# 示例：
## step1：添加不可见的select
### 
```html
// 注意几个disabled
<div id="hideselects" style="display: none">
   <select class="weui-select" id="test1">
      <option value="1">option1</option>
      <option value="2">option2</option>
      <option value="3" disabled="disabled">option3</option>
   </select>
   <select class="weui-select" id="test2">
      <optgroup label="Swedish Cars">
          <option value ="volvo">Volvo</option>
          <option value ="saab">Saab</option>
      </optgroup>
      <optgroup label="German Cars" disabled="disabled">
          <option value ="mercedes">Mercedes</option>
          <option value ="audi">Audi</option>
      </optgroup>
   </select>
</div>
```
## step2：添加显示的控件
###
```html
<div class="weui-cell weui-cell_access weui-cell_select weui-cell_select-after">
   <div class="weui-cell__hd">
       <label class="weui-label">测试一</label>
   </div>
   <div class="weui-cell__bd" pickerfrom="#test1">点击这里</div>
</div>
<div class="weui-cell weui-cell_access weui-cell_select weui-cell_select-after">
   <div class="weui-cell__hd">
       <label class="weui-label">group测试</label>
   </div>
   <div class="weui-cell__bd" pickerfrom="#test2">点击这里</div>
</div>
<div class="weui-cell weui-cell_access weui-cell_select weui-cell_select-after">
   <div class="weui-cell__hd">
       <label class="weui-label">disabled测试</label>
   </div>
   <div class="weui-cell__bd pickerdisabled" pickerfrom="#test1">点击这里</div>
</div>
```
## step3：调用init方法
###
```html
<script>
  weui.select2Picker.init();
</script>
```
## step4：测试
### 在浏览器打开页面并点击带有pickerfrom的div

**注** 此项目为我真实项目中抽取出来的，有些地方考虑不周，因为当前已经满足我的需要，有些地方走的不顺畅，是因为在我项目中有别的代码在支撑这一块的运作，上传时被我抽掉了，使用此项目时如果遇到不适用的地方，还请根据项目自行修改代码。
 
