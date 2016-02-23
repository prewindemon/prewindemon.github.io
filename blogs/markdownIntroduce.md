##1、兼容HTML
Markdown兼容一部分html语言，比如表格，是用table，tr，td可以在Markdown轻松的加上一段表格。  
<table width=100%>
   	<tr><td>编号</td><td>姓名</td><td>年龄</td></tr>
   	<tr><td>S0001</td><td>张三</td><td>22</td></tr>
</table>
##2、区块元素
###标题
是用#号标记一行为标题，#号的数量越少，标题越大。#号可以闭合。
###区块引用
>可以是用‘&gt;’来标记区块。<br />
>如果要换行，可以是用&lt;br /&gt;来换行  
>或者在结尾处按两下空格后回车也可以起到换行的效果  
>对于一个区块，即可以在每一行加上&gt;，也可以只加一个从而让整个段落变为一个区块  

如果不要继续在区块中输入，两个回车便可以解决问题。
>区块内可以嵌套区块
>>像这样，便在区块内嵌套了另一个区块，区块内可以是用html，也可以是用**markdown**标记
>><table width=100%>
   	<tr><td>编号</td><td>姓名</td><td>年龄</td></tr>
   	<tr><td>S0001</td><td>张三</td><td>22</td></tr>
   </table>
   
>从嵌套区块中逃出，如果仅仅跳出嵌套区块，别忘了前面添加&gt;

###列表
* 列表只需要在前面加*、+、-和空格号即可
- 这样便形成了一个列表
+ 用列表来展示信息

1. 上面是无需列表
2. 有序列表只需要数字加英文.即可
45. 当然，数字可以打乱，比如现在我的数字是45.，但你看到的依旧是3

###代码区块
代码区块顾名思义便是放置代码的地方，markdown在换行后使用三个空格便会自动识别为代码区块：

    public void writeMarkDown(String content)
    {
    	System.out.printf("Write MarkDown");
    }
不过这样的样式并不是很友好，因此推荐下面另一种方法，使用\`\`\`三个反引号来告诉markdown下面是代码区块，也可以前后是用\`\`\`将代码块包围起来。如果换行的话相当于html中的pre标签，内部格式与显示格式会一致。

```
public String readMarkDown(){
	return "Hello Markdown";
}
```
否则，会嵌入在当前行中```public void example(){}```  
在代码块中`<table>`这种html标签会被转化为原始码，不会再呈现表格形式。

```
<table width=100%>
   	<tr><td>编号</td><td>姓名</td><td>年龄</td></tr>
   	<tr><td>S0001</td><td>张三</td><td>22</td></tr>
</table>
```
如果是行内写代码的话，可以使用一个\`包围起来，如：`<span>`如果代码区域需要多个反引号，那么使用两个\`来包围。比如``<span>`</span>``。
###分割线
可以使用三个\*\*\*、\-\-\-、\_\_\_建立一个分割线，行内不能有其他内容，可以插入空格，举例：
*号分割线
***
_号分割线
___ 
-号分割线会造成字体变大的标题效果
---
###区段元素
>####链接
>Markdown支持两种形式链接语法，行内式和参考式。链接文字使用\[\]来标记。
>>#####行内式
>>使用```[我是一个链接](http://www.google.com "这里是标题")```这种形式来及时的反馈\[\]中链接的地址，此处地址可以是任意地址，可以使用相对路径，比如我们使用  
>>```[行内式](#t10 "到行内式")）```[行内式](#t10 "到行内式")  
>>或者使用
>>```[行内式](#行内式 "到行内式")）```[行内式](#行内式 "到行内式") 
>>来链接到行内式这个目录位置。
***
>>#####参考式
>>参考式类似于css样式表，我们可以在其他位置设置链接具体地址，在行内我们只需要定义个标记即可。我们可以使用  
>>```[我是一个链接a][我是b，用来标记链接a的地址]```  
>>之后，我们在文档的任意位置，将标记的链接内容定义出来：  
>>```[我是b，用来标记链接a的地址]:http://www.csdn.net/```  
>>事例：  
>>[这里要用到CSDN网址][csdn]    
>>这里要注意  
>>```[我是b，用来标记链接a的地址]:http://www.csdn.net/```   
>>尽量不要在区块内定义链接地址，否则可能造成无法定义的错误，如下  
>>[google]: http://google.com/ "Google"这个定义直接显示  
>>链接也可以用\<\>括起来，<http://www.csdn.net/>  
>>也可以使用隐式链接```[Google][]```[Google][]  
>>然后在区块外定义链接内容```[Google]:http://www.google.com/```  
>>

[Google]:http://www.google.com/
[csdn]:http://www.csdn.net/ "CSDN"
####强调
Markdown 使用星号（*）和底线（_）作为标记强调字词的符号，被 * 或 _ 包围的字词会被转成用 `<em>` 斜体标签包围，用两个 * 或 _ 包起来的话，则会被转成 `<strong>`粗体，例如：
>*一个\*号包围*  
>_一个\_号包围_  
>**两个\*号包围**  
>__两个\_号包围__

你可以随便用你喜欢的样式，唯一的限制是，你用什么符号开启标签，就要用什么符号结束。  
强调也可以直接插在文字中间：`中间有一个*强调*`-->中间有一个*强调*  
如果要输入普通的\*号，使用转义符反斜线\\\*
####图片
在文字中插入图片是经常需要的功能，当然，在纯文字应用中设计一个「自然」的语法来插入图片是有一定难度的。  
MarkDown使用一种和链接很相似的语法来标记图片，同样也是两种模式：行内式和参考式。
>#####行内式
>>```
>>![Alt "这是图片"](这里是链接)
>>![Alt "Img标签的Alt属性"](链接 "图片标题")
>>```
>>例:`![Alt CSDN](http://www.csdn.net/css/logo.png "CSDNLogo")`
>>![Alt CSDN](http://www.csdn.net/css/logo.png "CSDNLogo")
>
>####参考式
>格式与链接的参考式一致，举例：
>>```
>>![Alt CSDN][csdnLogo]
>>[csdnLogo]: http://www.csdn.net/css/logo.png "CSDNLogo"
>>```
>>![Alt CSDN][csdnLogo]  
>>同样要注意的是：`[csdnLogo]`不要在区块内定义。
[csdnLogo]: http://www.csdn.net/css/logo.png "CSDNLogo"

###说明
本文章通过MacOS下MacDown软件编写，其他的MarkDown编辑器诸如  

>####Windows平台  
* [MarkdownPad](http://markdownpad.com/)
* [MarkPad](http://code52.org/DownmarkerWPF/)  

>####Mac平台  
* [Mou](http://25.io/mou/)
* MarkDown`在APPStore下载即可`
* [MacDown](http://macdown.uranusjr.com/)

>####Linux平台  
* [ReText](http://sourceforge.net/p/retext/home/ReText/)

>####在线编辑器  
* [Markable.in](http://markable.in/)
* [Dillinger.io](http://dillinger.io/)

>####浏览器插件  
* [MaDe (Chrome)](https://chrome.google.com/webstore/detail/made/oknndfeeopgpibecfjljjfanledpbkog)  

###感言
第一次使用Markdown编写博客，兴趣盎然，确实比原先的好用很多，赞一个。