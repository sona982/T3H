// Bai 1
// let nhapChuoi = prompt("nhap vao mot chuoi: ");
// if (nhapChuoi.length >= 8) {
//     console.log("chuoi nay oke");
// }
// else {
//     console.log("Ngan qua, dai them ti nua");
// }

// Bai 2
// let a = parseInt(prompt("nhap vao so a: "));
// if(a>=18){
//     console.log("du 18 thi quay tiep");
// }
// else if(a>=16){
//     console.log("doi them it nam nua");
// }
// else{
//     console.log("con qua na tre")
// }

// bai3
// let sum = 0;
// for(let i = 1; i <= 50; i++){
//     sum += i;
// }
// console.log("tong tu 1-50 la: ",sum);


// bai4 
// let sumEven = 0;
// for(let i = -10; i<=50;i++){
//     if(i % 2 === 0){
//         sumEven +=i;
//     }
// }
// console.log("tong cac so chan tu -10 toi 50 la:",sumEven)

// bai 5
// let count= 0;
// for(let i = -100; i<=100;i++){
//     if(i % 9 === 0){
//         console.log(`lan thu ${count} la ${i}`);
//         count++;
//     }
// }

// bai6
// let i =1;
// while(i<=200){
//     console.log(i);
//     i++;
// }

// bai7
// let s = prompt("nhap vao mot chuoi s: ");
// let l = parseInt(prompt("nhap vao do dang mong muon cua chuoi: "));

// while(s.length < l){
//     s += 'a';
// }
// console.log(`chuoi sau khi them 'a' la: ${s}`);

// bai 8
// let x, y;
// do {
//     x = parseInt(prompt("Nhập số x (0 <= x < y <= 100): "));
//     y = parseInt(prompt("Nhập số y (0 <= x < y <= 100): "));
// } 
// while (x < 0 || y > 100 || x >= y);

// console.log("Bắt đầu quá trình:");
// while (x < y) {
//     console.log(`x = ${x}, y = ${y}`);
//     x++;
//     y--;
// }
// console.log(`Kết thúc: x = ${x}, y = ${y}`);

// bai9
// for(let i = 1; i<=500;i++){
//     console.log(i)
// }

// bai10
// for(let i =1;i<=300;i++) {
//     if(i % 2 ===0 && i % 3 === 0) {
//         console.log(i)
//     }
// }

// bai11
// let sum = 0;
// for(let i = -30; i <= 50; i++) {
//     if(i % 2 ===0) {
//         sum += i;
//     }
// }
// console.log(`tong cac so chan tu -30 toi 50 la: ${sum}`);

// bai12
// let n = parseInt(prompt("nhap so n de tinh giai thua: "));
// if(n < 0 || !Number.isInteger(n)) {
//     console.log("khong the tinh duoc giai thua cua so am va so thap phan");
// }
// else{
//     let giaiThua = 1;
//     // for(let i = 1; i<= n;i++) {
//     //     giaiThua *= i;
//     // }
//     while(n>0){
//         giaiThua *= n;
//         n--;
//     }
// }
// console.log(`giai thua cua so ${n} la : ${giaiThua}`);
// bai13 
// let a,b,x;
// do{
//     a = parseInt(prompt("nhap a vao day'a<b': "));
//     b = parseInt(prompt("nhap b vao day'a<b': "));
//     x = parseInt(prompt("nhap so can chia het: "));
// }
// while(a>=b||x<=0);
// // tiem so dau tien  >=a va chia het cho x
// let start = Math.ceil(a/x)*x;
// if(start <= b ) {
//     console.log(`so nho nhat trong khoang tu ${a} den ${b} chia het cho ${x} la : ${start}`);
// }
// else{
//     console.log(`khong co so nao chia het cho ${x} trong khoang tu ${a} den ${b}`);
// }

// bai14 
// let n;
// do{
//     n = parseInt(prompt("nhap so n (n>=2)"));
// }
// while(n < 2 || isNaN(n));

// let sum = 0;
// for(let i = 1; i<=n; i++){
//     sum+=1/(i*(i+1));
// }
// console.log(`ket qua cua bieu thuc theo n = ${n} la: ${sum}`);
// bai15 
// Ước là số được chia hết bởi một số khác
let n;
do{
    n = parseInt(prompt("nhap so n de tinh uoc cua so do:" ));
}
while(n<=0 || isNaN(n));
let count = 0;
for(let i = 1; i<=n;i++) {
    if(n%i===0){
        count ++;
    }
}
console.log(`so uoc cua ${n} la: ${count}`);