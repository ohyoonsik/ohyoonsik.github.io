# 20221179 오윤식
[**homework2-1**](https://ohyoonsik.github.io/homework2_1.html) <br>
[**homework2-2**](https://ohyoonsik.github.io/homework2-2.html) <br>
[**homework2-3**](https://ohyoonsik.github.io/homework2-3.html) <br>
[**homework2-4**](https://ohyoonsik.github.io/homework2-4.html) <br>
[**css_demo**](https://ohyoonsik.github.io/css_demo.html) <br>
[**homework3-1**](https://ohyoonsik.github.io/homework3-1.pnp) <br>
[**homework3-2**](https://ohyoonsik.github.io/homework3-2.pnp) <br>
중간고사 w3 combinators 자손 문제 나옴 <br>
Descendant combinator (space) <br>
Child combinator (>) <br>
Next sibling combinator (+) <br>
Subsequent-sibling combinator (~) <br>
[title물결="flower"] { <br>
  border: 5px solid yellow; <br>
}<br>
"물결="는 특정 단어가 들어가있는 오브젝트에 영향을 준다 타이틀 단어 사이에 블랭크만 있어야 인식 가능 <br>
<교수님 노트> <br>
The [attribute="value"] selector is used to select elements with a specified attribute and value. <br>
The [attribute~="value"] selector is used to select elements with an attribute value containing a specified word.<br> ~= 기호로 작성된 속성 선택자는 하이픈 -, 언더바_, 공백없이 작성된 합성어는 선택이 되지 않음.<br> The example above will match elements with title="flower", title="summer flower", and title="flower new", but not title="my-flower" or title="flowers".<br>


The [attribute|="value"] selector is used to select elements with the specified attribute, whose value can be exactly the specified value, or the specified value followed by a hyphen (-).<br> [속성명]이 일치하고, [속성값]이 특정 접두사로 시작하는 요소를 선택자로 지정합니다.(글자가 붙어있으면 불가능)<br>
The [attribute^="value"] selector is used to select elements with the specified attribute, whose value starts with the specified value. (형태 상관없음)<br>


The [attribute$="value"] selector is used to select elements whose attribute value ends with a specified value.<br>
The [attribute*="value"] selector is used to select elements whose attribute value contains a specified value.<br>

<?php
function foo(&$str) {
   $str .= "world...";
}
   
function swap(&$a, &$b) {
   $temp = $b;
   $b = $a;
   $a = $temp;
}
   
$a = 10;
$b = 15;
echo("\$a : $a - \$b : $b<br>");
   
swap($a,$b);
echo("\$a : $a - \$b : $b<br>");
   
$str = "Hello! ";
echo("$str<br>");
foo($str);
echo("$str<br>");   
?>
&위치 주목 시험출제

함수  $위치 결과값 출제
