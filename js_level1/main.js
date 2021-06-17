// function sum(a,b){
//     return a+b;
// }

// function sumPrice(a){
//     var result = 0;
//     for(var i=0 ; i<a.length; i++){
//         result = result + a[i];
//     }
//     return result;
// }

// console.log(sumPrice([1,2,3,4,5]));



/*
function testNumber(number) {
    var result;
    if(number%2 == 0){
        result = true;
    }else{
        result =  false;
    }
    return result;
}
console.log(testNumber(4));

function filterNumber(numbers) {
    var evennumbers = [];
    for(var i=0 ; i<numbers.length; i++){
        if(!testNumber(numbers[i])) {
            evennumbers.push(numbers[i]);
        }
    }
    return evennumbers;
}
console.log(filterNumber([1, 2, 3, 4, 5, 6, 7, 8, 9]));
*/

function Item(nameitem, price, brand){
    this.nameitem = nameitem;
    this.price = price; 
    this.brand = brand;
    this.getNameBrand = function(){
        return `${this.nameitem} ${this.brand}`;
    }
}

Item.prototype.ship = 'Viettel post';

var cosmetic = new Item('Toner', '150.000đ', 'Manmode');
var clothes = new Item('T-shirt', '100.000đ', 'No brand');

cosmetic.nation = 'Viet Nam';


console.log(clothes.getNameBrand());
console.log(cosmetic);

console.log(clothes.constructor)


var date = new Date();
var year = date.getFullYear();

console.log(year);

var a = 3;
function run(a) {
    return a.toFixed() == a  ? a : Math.floor(a);
}
console.log(',,,', run(1.2))


function checkPositiveInteger(number){
    if(typeof number =='number' && number.toFixed() == number  && number > 0 ){
        return true;
    }else{
        return false;
    }
}
checkPositiveInteger(1.2)
console.log(checkPositiveInteger(1.2))


//Vòng lặp Do/While

var i=0;
var isSuccess = false;
do {
    i++;
    if(isSuccess == false){
        console.log('Nạp thẻ thất bại!')
    }else{
        console.log('Nạp thẻ thành công!')
    }

} while(!isSuccess == true && i<= 3)

// Làm việc với array

//bai 5
function findStringsInArrayByKeyword(keyword, strings) {
    var newString = strings.filter(function(key, index){
        return key.indexOf(keyword) > -1;
    });
    return newString? newString :[];
    }

console.log(findStringsInArrayByKeyword('PHP', ['Javascript', 'PHP']));

//bai 6
function findEquaValues(array1, array2){
    var array3 = array1.concat(array2);
    console.log(array3);
    var result = array3.filter(function(i, index){
        return array3.indexOf(i) != index ;
    })
    console.log(array3.indexOf(i))
    return result? result: []
}
console.log(findEquaValues([1, 2, 6, 8], [2, 9, 6]));

// map() method

//bai1
function convertToBoolean(inputs) {
    
    var newArray = inputs.map(function(type, index){
         if(type != [0, NaN, "", '', false, undefined, null ]){
             return type = true;
         }else{
             return type = false;
         }
    });
    return newArray;
}

console.log(convertToBoolean([0, false, 8]));

// reduce() method

// Flat - làm phẳng mảng từ Depth aray
//bai 1

var depthArray = [1, 2, [3,4], 5, 6, [7, 8, 9]];

var flatArray = depthArray.reduce(function(flatOutput, depthItem){
    return flatOutput.concat(depthItem);
}, []);

console.log(flatArray);

//bai 2

var topics = [
    {
        topics: 'Front-end',
        courses:[
            {
                id: 1,
                title: 'HTML, CSS'
            },
            {
                id: 2,
                title: 'JavaScript'
            }
        ]
    },
    {
        topics: 'Back-end',
        courses:[
            {
                id:1,
                title:'PHP'
            },
            {
                id:2,
                title:'Ruby'
            }
        ]
    }
];

var newTopics = topics.reduce(function(courses, topic){
    return courses.concat(topic);
}, [])

console.log(newTopics);

//Tạo phương thức reduce2()
// Là một hàm nhận vào 2 tham số là callback và initialvalue(giá trị khởi tạo) cũng là kế quả cuối cùng nên đặt là result 
Array.prototype.reduce2 = function(callback, result){  
    let i = 0;
    if(arguments.length < 2){
        i = 1;
        result = this[0];
    }
    for(; i < this.length; i++){
        result = callback(result, this[i], i, this)  //callback được gọi lại qua mỗi lần lặp

    }
    return result;
    }

var numbers = [1, 2, 3, 4, 5];

var result = numbers.reduce2(function(total, number){
    return total + number;
})

console.log(result);

// Tạo phương thức map2

Array.prototype.map2 = function(callback){
    var output = [];
    var arrayLength = this.length;

    for(var i = 0; i < arrayLength; i++){
        var result = callback(this[i], i);
        output.push(result);
    }
    return output;
}

var courses = [
    'JavaScript',
    'PHP',
    'Ruby'
];

var htmls = courses.map2(function (course, index){
    return `<h2>${course}</h2>`;
});

console.log(htmls);

//Tạo phương thức forEach2 
/* 
Bản chất của forEach() không return. 
Không trả về giá trị mà chỉ lặp qua các phần tử có trong mảng 
Chỉ lặp qua các phần tử thực có trong mảng, không care đến chiều dài của mảng 
==> Dùng vòng lặp for/in 
*/

/* 
Khi for/in chạy nó sẽ chạy qua các element trong prototype
khi đó forEach2 mà ta tự thêm vào thì for/in cx duyệt qua và log ra forEach2
Nên sử dụng '.hasOwnProperty()' để kiểm tra index có phải của thằng gần nhất hay k. 
*/

Array.prototype.forEach2 = function(callback) {
    for(var index in this){
        if(this.hasOwnProperty(index)){
                callback(this[index], index, this)
            }
    }
}


var numbers = [1, 2, 3, 4, 5];

var listNumber = numbers.forEach2(function(number, index, array){
    console.log(number, index, array);
})

//Tạo phương thức filter2 

Array.prototype.filter2 = function(callback){
    var output = [];
    for(var index in this){
        if(this.hasOwnProperty(index)){
            var result = callback(this[index], index, this);
            if(result){
                output.push(this[index]);
            }
        }
    }
    return output;
}

var courses = [
    {
        name: 'JavaScript',
        coin: 690
    },
    {
        name: 'PHP',
        coin: 890
    },
    {
        name: 'Ruby',
        coin: 980
    }
];

var findCoin = courses.filter2(function (course, index){
    return course.coin > 700;
});

console.log(findCoin);

// Tạo phương thức some2 (tra về true/ false)
/*
Array.prototype.some2 = function(callback){
    for(var index in this){
        if(this.hasOwnProperty(index)){
            if(callback(this(index), index, this)){
                return true;
            }
        }
    }
    return false;
}

var courses = [
    {
        name: 'JavaScript',
        coin: 690,
        finish: true
    },
    {
        name: 'PHP',
        coin: 890,
        finish: true
    },
    {
        name: 'Ruby',
        coin: 980,
        finish: false
    }
];

var findFinish = courses.some2(function (course, index, array){
    return course.finish;
});


// Tạo phương thức every2

Array.prototype.every2 = function(callback) {
    for(var index in this){
        if(this.hasOwnProperty(index)){
                var result = callback(this[index], index, this)
                if (!result){
                    return false;
                }
            }
    }
}

var courses = [
    {
        name: 'JavaScript',
        coin: 690,
        finish: true
    },
    {
        name: 'PHP',
        coin: 890,
        finish: false
    },
    {
        name: 'Ruby',
        coin: 980,
        finish: true
    }
];

var findFinish = courses.every2(function (course, index, array){
    return course.finish;
});

console.log(findFinish);
*/
//HTML DOM
    // Get element methods
    var boxNode = document.querySelector('.box-1');
    console.log(boxNode);

    console.log(boxNode.querySelectorAll('li'))

    //Bai 1

var boxElement = document.querySelector('.box');
console.log(boxElement);
console.log(boxElement.querySelectorAll('.children'));

    //Attribute node and Text node
    
var f8LinkElement = document.getElementsByTagName('a')[0];
console.log(f8LinkElement);

var f8ShortLink = f8LinkElement.getAttribute('href');
console.log(f8ShortLink);

var f8LinkElement2 = document.getElementsByTagName('a')[1];
f8LinkElement2.href = f8ShortLink;
console.log(f8LinkElement2);

var box = document.querySelector('div');
box.setAttribute('dara-url', f8ShortLink);
console.log(box);


//DOM style

var box1 = document.querySelector('.box');
Object.assign(box1.style, {
    width: '200px',
    height: '100px',
    backgroundColor: 'red'
});

// ClassList

var div1 = document.querySelector('.div1');
div1.classList.add('red');
div1.classList.remove('red');
console.log(div1.classList.contains('div1'));
setInterval(() =>{
    div1.classList.toggle('red');
},1000)

//DOM event

var div1 = document.querySelector('.div1');

div1.onclick = function(){
    console.log(Math.random());
}

// Lấy ra element node mà mình click vào, mouseEvent viết tắt là e
var divElements = document.querySelectorAll('div');
console.log(divElements);

for(var i = 0; i < divElements.length; i++){
    divElements[i].onclick = function(mouseEvent){
        console.log(mouseEvent.target);
    }
}

// Input/select

//Lấy ra value mà người dùng nhập vào input, 
//check vào checkbox hay chưa, chọn cái nào trong select

var inputElement = document.querySelector('input[type="text"]');

inputElement.oninput = function(e){
    console.log(e.target.value);
}

var inputElement2 = document.querySelector('input[type="checkbox"]');

inputElement2.onchange = function(e){
    console.log(e.target.checked);
}

var selectElement = document.querySelector('select');

selectElement.onchange = function(e){
    console.log(e.target.value);
}

// PreventDefault and StopPropagation
/* Loại bở hành vi mặc định của trình duyệt lên thẻ HTML 
Loại bỏ sự kiện nổi bọt 
*/

var aElements = document.links;
for(var i = 0; i < aElements.length; i++){
    aElements[i].onclick = function(e){
        if (!e.target.href.startsWith('https://f8.edu.vn/')){
            e.preventDefault();
        }
    }
}

// Event listener

//Dom event

var btn = document.querySelector('button');

//     btn.onclick = function() {
//     console.log('viec 1');
//     console.log('viec 2');
//     console.log('viec 3');
// }

// eventListener

function viec1(){
    console.log('viec 1');
}
function viec2(){
    console.log('viec 2');
}
function viec3(){
    console.log('viec 3');
}

btn.addEventListener('click', viec1);

//Promise

// Tạo một promise
var promise = new Promise(function(resolve, reject){
    //Executor 
    //Logic
    // Thành công: resolve()
    // Thất bại: reject()
    resolve()
});
promise
    .then(function(){
        //resolve sẽ lọt vào đây
    })
    .catch(function(){
        //reject sẽ lọt vào đây
    })
    .finally(function(){

    })

// Sau 1s in ra số 1, sau 1s in ra số 2,....
function sleep(ms){
    return new Promise(function(resolve){
        setTimeout(resolve, ms)
    });
}
sleep(1000)
    .then(function(){
        return sleep(1000);
    })
    .then(function(){
        return sleep(1000);
    })
    .then(function(){
        return sleep(1000);
    })
    .then(function(){
    })

// Promise (resolve, reject, all)

// Khi xác định promise là resolve thì dùng Promise.resolve 
// Khi xác định promise là reject thì dùng Promise.reject
// Promise.all sẽ chạy // các promise, nếu một trong các promise trong promise.all là reject thì nó sẽ lọt vào catch

var promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve([1])
    }, 1000);
});
/*
var promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve([2,3])
    }, 3000);
});
*/
var promise2 = Promise.reject('Co loi!');

Promise.all([promise1, promise2])
    .then(function(result){
        var result1 = result[0];
        var result2 = result[1];
        console.log(result1.concat(result2));
    })
    .catch(function(error){
        console.log('error: ', error);
    })

// Promise Example

var users = [
    {
        id: 1,
        name: 'Kien Dam'
    },
    {
        id: 2,
        name: 'Son Dang'
    },
    {
        id: 3,
        name: 'Doan beo'
    }
];

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'Anh Son chua ra video :('
    },
    {
        id: 2,
        user_id: 2,
        content: 'Vua ra xong em oi!'
    }
];

// 1. Lấy comment
// 2. Lấy ra user_id từ comments
// 3. từ user_id lấy ra user tương ứng

// Fake API
// Việc lấy dữ liệu qua API là hành động xử lý bất đồng bộ trong JS nên cần sử dụng promise

function getComments() {
    return new Promise(function(resolve) {
        setTimeout(function(){
            resolve(comments);
        }, 1000);
    });
}

//Lấy ra danh sách id 
function getUsersByIds(userIds){
    return new Promise(function(resolve){
        var result = users.filter(function(user){
                return userIds.includes(user.id)
            });
        setTimeout(function(){
            resolve(result);
        }, 1000);
    });
}

getComments()
    .then(function(comments){
        var userIds = comments.map(function(comment){
            return comment.user_id;
        });

        getUsersByIds(userIds)
            .then(function(users){
                return {
                    users: users,
                    comments: comments
                };
            });
    })
    .then(function(data){
        var commentBlock = document.getElementById('comment-block');
        var html = '';
        data.comments.forEach(function(comment){
            var user = data.users.find(function(user){
                return user.id ===  comment.user_id;
            });
            html += `${user.name}: ${comment.content}`;
        });

        commentBlock.innerHTML = html;
    })





// Fecth

var postAPI ='https://jsonplaceholder.typicode.com/posts';


fetch(postAPI)
    .then(function(response){
        return response.json();
        // JSON.parse: JSON -> Javascript
    })
    .then(function(post){
        var htmls = post.map(function(post){
            return `<li>
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            </li>`;
        });
        var html = htmls.join('');
        document.getElementById('posts-block').innerHTML = html;

    })

// Arrow funtion

// Nếu k có ngoặc sẽ hiểu là return ra luôn
const sum = (a,b) => a + b;
console.log(sum(2,4));

// Khi chỉ có một biến thì k cần ngoặc
const logger = log => console.log(log);
logger('Name: ....')

// Khi muốn return ra một object 
const object = (a, b) => ({a: a, b: b});
console.log(object(2,4));

// Class : là cách viết khác của contructor funtion trong ES6,
// trong class có phương thức contructor

class Course {
    constructor (name, price){
        this.name = name;
        this. price = price;
    }

    getName(){
        return this.name;
    }

    getPrice(){
        return this.price;
    }
}

const phpcourse = new Course ('PHP', 1000);
const jscourse = new Course ('Javascript', 1200);

console.log(phpcourse);
console.log(jscourse);

