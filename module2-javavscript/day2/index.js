// let nam = parseInt(prompt("Nhap nam vao day : "));
// let thang = parseInt(prompt("Nhap thang vao day : "));

// if(nam <= 0){
//     alert("Nam khong hop le");
// }
// else{
//     function tinhSoNgay(nam,thang){
//         switch(thang) {
//             case 1: case 3: case 5: case 7: case 8: case 10: case 12:
//                 return 31;
//             case 4: case 6: case 9: case 11:
//                 return 30;
//             case 2: {
//                 if((nam % 4 === 0 && nam % 100 !== 0) || nam % 400 === 0){
//                     return 29;
//                 }
//                 else{
//                     return 28;
//                 }
//             }
//             default:{
//                 alert("Thang khong hop le");
//             }
//         }
//     }
//     let soNgay = tinhSoNgay(nam,thang);
//     alert(`thang ${thang} nam ${nam} co ${soNgay} ngay`);
// }


// let i = 0
// while(i < 10){
//     console.log(i+1);
//     i++;
// }

// let a = 0
// do{
//     console.log(a+1);
//     a++;
// }while(a <= 10);

for(let i =0; i < 10; i+=2){
    console.log(i+1);
}