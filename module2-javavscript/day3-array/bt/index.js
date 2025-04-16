// bai 1
// let arr1 = [`a`, `b`, `c`];
// let arr2 = [`a`, `b`, `c`];

// console.log(`arr1: ${typeof(arr1)}, arr2: ${typeof(arr2)}`);
// let result = arr1 + arr2;
// console.log(result);


// // neu muon kiem tra hai mang xem coi co cung noi dung khong thi sai JSON.stringify(arr1) == ~~
// let compare = arr1 == arr2;
// console.log(compare);

// bai 2
// let arr = [1,2,3,4];
// c1:
// console.log(`index 0: ${number[0]}, index 3: ${number[3]}`);
// let result = number[1] + number[2];
// console.log(result);

// let swap = number[1];
// number[1] = number[3];
// number[3] = swap;
// console.log(number)

// c2:
// function swap(arr, index1, index2){
//     arr.splice(index1,1,arr.splice(index2,1,arr[index1])[0])
// }
// swap(arr, 1, 3);
// console.log(arr);

// bai3 
// let arr = [1,2,3,4,5,6,7,8,9];
// let newArray = arr.filter( num => num % 2 === 0);
// console.log(newArray);

// bai 4
// let arr = [];
// let n = parseInt(prompt("nhap so n > 0 de tao mang ngau nhien: "));
// if(n>0){
//     for(let i = 0; i<n; i++){
//         let randomNumber = Math.floor(Math.random() * 100); // so ngau nhien tu 0 - 99
//         arr.push(randomNumber);
//     }
//     console.log(`mang ngau nhien gom: ${arr}`);
// }
// else{
//     console.log("nhap n > 0");
// }

// bai 5
// let arr = [5,10];
// let n = parseInt(prompt("nhap n ( n > 2): "));
// if(n>2){
//     while(arr.length < n){
//         arr.unshift(0)
//     }
//     console.log(`mang sau khi them o: [${arr}]`);
// }
// else{
//     console.log(`vui long nhap so lon hon 2`)
// }

// bai 6
// let arr = [1,2,3,4,5];
// while(arr.length > 1){
//     arr.pop();
// }
// console.log(`mang sau cung duoc chon con ${arr}`);

// bai 7 
