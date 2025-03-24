let arr = [1, 2, 3, 4, 5]; // Mảng ban đầu

// Thêm phần tử vào đầu mảng (thêm 0)
let newArr = [arr.length]; // Tạo mảng mới chứa phần tử cần thêm
console.log(newArr)
for (let i = 0; i < arr.length; i++) {
    newArr[i + 1] = arr[i]; // Dời tất cả phần tử sang phải
}
console.log("Sau khi thêm vào đầu:", newArr);