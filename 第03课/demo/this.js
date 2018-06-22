var a = 10;

function test() {
  a = 5;
  alert(a);
  alert(this.a);
  var a;
  alert(this.a);
  alert(a);
}
