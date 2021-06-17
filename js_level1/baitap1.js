/* Bài 1: Viết hàm kiểm tra độ dài của một chuỗi bất kì. Nếu độ dài của chuỗi lớn hơn 10 thì chuyển chuỗi đó thành chuỗi các chữ hoa , 
nếu độ dài nhỏ hơn 10 thì chuyển chuỗi đó thành chuỗi các chữ thường. 
Return chuỗi mới. */

function testLength(texts){
    if(texts.length > 10){
        return texts = texts.toUpperCase();
    }else{
        return texts = texts.toLowerCase();
    }
}

console.log('bai1', testLength('Quynh xinh'));

/* Bài 2: Viết hàm thêm tên đệm. Hàm này nhận vào tham số là 1 chuỗi có giá trị là họ tên. Yêu cầu thêm tên đệm.
 Ví dụ tham số là "Pham Doan" , yêu cầu kết quả là "Pham Van Doan".*/

 function addMiddleName(fullName){
    var indexOfSpace = fullName.indexOf(' ');
    var firstName = fullName.slice(0,indexOfSpace);
    var lastName = fullName.slice(indexOfSpace)
    return firstName + ' Thi' + lastName;
 }

 
 console.log('bai2',addMiddleName('Nguyen Quynh'));

 /* Bài 3: Viết một hàm kiểm tra một chuỗi có các từ ngữ tục hay không. Hàm này sẽ nhận vào tham số là một chuỗi bất kì. 
 Kiểm tra xem trong chuỗi đó có từ 'địt mẹ' hay không. 
 Nếu có thay thế chỗ có từ 'địt mẹ' bằng '****' và trả về chuỗi đó. Nếu không thì trả về chuỗi đó.
Ví dụ: 
`Tham số: "Quỳnh xinh gái!"
Kết quả: "Quỳnh xinh gái!" `
`Tham số: "địt mẹ thằng ngu"
Kết quả: "**** thằng ngu" `
*/

function testText(lineTexts){
    if(lineTexts.indexOf('địt mẹ') != -1){
       return lineTexts = lineTexts.replace(/địt mẹ/g, '****');
    }else{
        return lineTexts;
    }
}

console.log(testText('là thằng ngu'));

/* Bài 4: Viết hàm nhận vào tham số là 2 số bất kì. Kiểm tra xem 2 số đó có phải là số nguyên âm không. 
Nếu cả 2 đều là số nguyên âm trả về true, ngược lại trả về false.
*/

function testNumber(a, b){
    if(a < 0 && b < 0 && a.toFixed() == a && b.toFixed() == b){
        return true;
    }else return false;
}

console.log(testNumber(-2, -3));

/* Bài 5: Hãy thử 5 phép toán trong mảng.
Tạo mảng có tên là styles với các mục “Jazz” và “Blues”.
-Thêm “Rock-n-Roll” vào cuối.
-Thay thế giá trị ở giữa bằng “Classics”. Code để tìm giá trị giữa sẽ hoạt động với bất kỳ mảng nào có độ dài lẻ.
-Tách giá trị đầu tiên của mảng và hiển thị nó.
-Thêm trước Rap và Reggae vào mảng.
*/

var styles = ['Jazz', 'Blues'];

//Push
styles.push('Rock-n-Roll');
console.log(styles);

//Splice
var indexOfMidItem = Math.floor(styles.length/2);

styles[indexOfMidItem] = 'Classics';

// styles.splice(styles.length/2 , 1, 'Classics');
console.log(styles);
//Shift
console.log(styles.shift());
//Unshift
styles.unshift('Rap', 'Regga');
console.log(styles);

/* Bài 6: Shoppe có chương trình flash sale theo loại sản phẩm.
Sản phẩm thuộc loại 'May mặc' sẽ được giảm giá 20%, sản phẩm thuộc loại 'Đồ gia dụng' giảm 30% ,
sản phẩm thuộc loại 'Thực phẩm' giảm 50% và sản phẩm thuộc loại 'Phụ kiện điện thoại'  giảm 90%, 
các loại khác đều giảm 10%. Viết hàm nhận tham số là loại sản phẩm trả
về kết quả là số phần trăm giảm giá tương ứng với loại đó (sử dụng switch case để làm).
*/

function precentsDiscount(type){
   var result;
    switch(type) {
        case  'May mặc':
            result = 20/100;
            break;
        case  'Đồ gia dụng':           
             result = 30/100;
            break;
        case  'Thực phẩm':
            result = 50/100;
            break;
        case  'Phụ kiện điện thoại':
            result = 90/100;
            break;
        default:
            result = 10/100;   
    }
    return result;
}

console.log(precentsDiscount('Phụ kiện điện thoại'));

/* Bài 7: Viết một hàm tính tiền sau khi giảm giá. Hàm này nhận vào một tham số là 1 object có dạng 
{
  product: ....,
  price: ....,
  type:....
}
Yêu cầu tính số tiền khách hàng phải trả sau khi đã được giảm giá.
Gợi ý:  Dùng lại hàm tính số phần trắm giảm giá ở bài 6 đẻ tính số % được giảm giá của sản phẩm.
 Với type chính là 'loại sản phẩm'.
Ví dụ:
Tham số : 
{
  product: 'Ốp điện thoại',
  price: 100000,
  type: 'Phụ kiện điện thoại'
}
Kết quả mong muốn: 10000

Tham số : 
{
  product: 'Áo phông thể thao',
  price: 200000,
  type: 'May mặc'
}
Kết quả mong muốn: 160000
*/
// var tongtien = 0;

// for(var i=0,i<cart.length;i++){
//     result+= calcPrice(cart[i])
// }

function calcPrice(product){
    return product.price - product.price * precentsDiscount(product.type);
}

var price1={
    product: 'Áo phông thể thao',
    price: 200000,
    type: 'May mặc'
  } 

console.log(calcPrice(price1));

function Item(product, price, type){
    this.product = product;
    this.price = price;
    this.type = type;
    this.calPrice = function(){
        return calPrice = price * precentsDiscount(type);
    }
}

var phoneAccessories = new Item('Ốp điện thoại', 100000, 'Phụ kiện điện thoại');
console.log(phoneAccessories);

var clothes = new Item('Áo phông thể thao', 200000, 'May mặc');
console.log(clothes);

console.log(clothes.calPrice());

var url="http://localhost:3000/";

var callAPI =  fetch(url + 'posts');

callAPI.then(function(res){
    return res.json()
}).then(function(data){
    console.log(data);
})

