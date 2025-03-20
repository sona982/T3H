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
let n = parseInt(prompt("nhap so n de tinh giai thua: "));
if(n < 0 || !Number.isInteger(n)) {
    console.log("khong the tinh duoc giai thua cua so am va so thap phan");5

}
else{
    let giaiThua = 1;
    for(let i = 1; i<= n;i++) {
        giaiThua *= i;
    }
}
console.log(`giai thua cua so ${n} la : ${giaiThua}`);