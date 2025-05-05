
/**
 * Class StudentManager - Quản lý toàn bộ thao tác với sinh viên
 */
class StudentManager {     
    constructor() {
        this.storageKey = "students";
        this.initializeEventListeners();
        this.initializeData();
    }

    /**
     * Khởi tạo tất cả các event listeners
     */
    initializeEventListeners() {
        // Form thêm sinh viên
        document.getElementById("student-form").addEventListener("submit", (e) => {
        e.preventDefault();
        this.addStudent();
        });

        // Tìm kiếm real-time
        const searchInput = document.getElementById("search-input");
        searchInput.addEventListener("input", () => {
        this.performSearch(searchInput.value);
        });

        // Nút tìm kiếm
        document.getElementById("search-btn").addEventListener("click", () => {
        this.performSearch(searchInput.value);
        });

        // Đăng ký sự kiện cho các nút Update và Delete (sử dụng event delegation)
        document.getElementById("student-list").addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("update-btn")) {
            const studentId = parseInt(target.dataset.id);
            this.prepareUpdateStudent(studentId);
        } else if (target.classList.contains("delete-btn")) {
            const studentId = parseInt(target.dataset.id);
            this.deleteStudent(studentId);
        }
        });
    }

    /**
     * Khởi tạo dữ liệu ban đầu
     */
    initializeData() {
        if (!localStorage.getItem(this.storageKey)) {
        import("./data.js")
            .then((module) => {
            this.saveStudents(module.students);
            this.renderStudentList(this.getStudents());
            })
            .catch(() => {
            this.renderStudentList([]);
            });
        } else {
        this.renderStudentList(this.getStudents());
        }
    }

    /**
     * Lấy danh sách sinh viên từ localStorage
     * @returns {Array} Danh sách sinh viên
     */
    getStudents() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    /**
     * Lưu danh sách sinh viên vào localStorage
     * @param {Array} students - Danh sách sinh viên cần lưu
     */
    saveStudents(students) {
        localStorage.setItem(this.storageKey, JSON.stringify(students));
    }

    /**
     * Tính điểm trung bình của sinh viên
     * @param {Object} student - Thông tin sinh viên
     * @returns {string} Điểm trung bình đã được làm tròn
     */
    calculateAverage(student) {
        const { mathScore, englishScore, literatureScore } = student;
        const average = (mathScore + englishScore + literatureScore) / 3;
        return average.toFixed(2);
    }

    /**
     * Hiển thị danh sách sinh viên lên bảng
     * @param {Array} studentsList - Danh sách sinh viên cần hiển thị
     */
    renderStudentList(studentsList) {
        const studentListContainer = document.getElementById("student-list");
        studentListContainer.innerHTML = "";

        if (studentsList.length === 0) {
        const emptyRow = document.createElement("tr");
        emptyRow.innerHTML =
            '<td colspan="8" class="text-center">Không có sinh viên nào</td>';
        studentListContainer.appendChild(emptyRow);
        return;
        }

        studentsList.forEach((student, index) => {
        const averageScore = this.calculateAverage(student);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${this.escapeHtml(student.name)}</td>
            <td>${student.gender}</td>
            <td>${student.mathScore}</td>
            <td>${student.englishScore}</td>
            <td>${student.literatureScore}</td>
            <td>${averageScore}</td>
            <td>
                <button class="btn btn-sm btn-warning me-1 update-btn" data-id="${student.id}" 
                style="background-color: red; color: white; border: none;">Update</button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${student.id}" 
                style="background-color: green; color: white; border: none;">Delete</button>
            </td>
            `;
        studentListContainer.appendChild(row);
        });
    }

    /**
     * Mã hóa HTML để tránh XSS
     * @param {string} text - Văn bản cần mã hóa
     * @returns {string} Văn bản đã mã hóa
     */
    escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Kiểm tra tính hợp lệ của dữ liệu sinh viên
     * @param {Object} formData - Dữ liệu từ form
     * @returns {boolean} Kết quả kiểm tra
     */
    validateStudentData(formData) {
        const { name, gender, mathScore, englishScore, literatureScore } = formData;

        if (
        !name ||
        !gender ||
        isNaN(mathScore) ||
        isNaN(englishScore) ||
        isNaN(literatureScore)
        ) {
        this.showMessage("Vui lòng nhập đầy đủ thông tin!");
        return false;
        }

        const scores = [mathScore, englishScore, literatureScore];
        for (const score of scores) {
        if (score < 0 || score > 10) {
            this.showMessage("Điểm số phải nằm trong khoảng từ 0 đến 10!");
            return false;
        }
        }

        return true;
    }

    /**
     * Kiểm tra tên sinh viên đã tồn tại hay chưa
     * @param {string} name - Tên sinh viên cần kiểm tra
     * @param {number} excludeId - ID sinh viên để loại trừ khi cập nhật
     * @returns {boolean} Kết quả kiểm tra
     */
    isNameExist(name, excludeId = null) {
        const students = this.getStudents();
        return students.some(
        (student) =>
            student.name.toLowerCase() === name.toLowerCase() &&
            (excludeId === null || student.id !== excludeId),
        );
    }

    /**
     * Thu thập dữ liệu từ form
     * @returns {Object} Dữ liệu đã thu thập
     */
    collectFormData() {
        return {
        name: document.getElementById("name").value.trim(),
        gender: document.querySelector('input[name="gender"]:checked')?.value,
        mathScore: parseFloat(document.getElementById("mathScore").value),
        englishScore: parseFloat(document.getElementById("englishScore").value),
        literatureScore: parseFloat(
            document.getElementById("literatureScore").value,
        ),
        };
    }

    /**
     * Thêm sinh viên mới
     */
    addStudent() {
        const formData = this.collectFormData();

        if (!this.validateStudentData(formData)) {
        return;
        }

        if (this.isNameExist(formData.name)) {
        this.showMessage("Sinh viên này đã tồn tại trong danh sách!");
        return;
        }

        const students = this.getStudents();
        const newStudent = {
        id: Date.now(), // Sử dụng timestamp làm ID để đảm bảo tính duy nhất
        ...formData,
        };

        students.push(newStudent);
        this.saveStudents(students);
        this.showMessage("Thêm sinh viên thành công!");

        this.resetForm();
        this.refreshStudentList();
    }

    /**
     * Chuẩn bị cập nhật thông tin sinh viên
     * @param {number} studentId - ID của sinh viên
     */
    prepareUpdateStudent(studentId) {
        const students = this.getStudents();
        const student = students.find((s) => s.id === studentId);

        if (!student) {
        this.showMessage("Không tìm thấy sinh viên!");
        return;
        }

        // Điền thông tin sinh viên vào form
        document.getElementById("name").value = student.name;
        document.getElementById("mathScore").value = student.mathScore;
        document.getElementById("englishScore").value = student.englishScore;
        document.getElementById("literatureScore").value = student.literatureScore;

        // Chọn giới tính
        const genderRadio = document.querySelector(
        `input[name="gender"][value="${student.gender}"]`,
        );
        if (genderRadio) {
        genderRadio.checked = true;
        }

        // Chuyển nút thêm thành nút cập nhật
        const submitBtn = document.getElementById("create-student-btn");
        submitBtn.textContent = "Update Student";
        submitBtn.dataset.mode = "update";
        submitBtn.dataset.id = studentId;

        // Tạm thời thay đổi event listener cho nút submit
        submitBtn.removeEventListener("click", this.addStudent);
        submitBtn.addEventListener(
        "click",
        (e) => {
            e.preventDefault();
            this.updateStudent(studentId);
        },
        { once: true },
        ); // once: true để đảm bảo event listener này chỉ chạy một lần
    }

    /**
     * Cập nhật thông tin sinh viên
     * @param {number} studentId - ID của sinh viên
     */
    updateStudent(studentId) {
        const formData = this.collectFormData();

        if (!this.validateStudentData(formData)) {
        return;
        }

        if (this.isNameExist(formData.name, studentId)) {
        this.showMessage("Tên sinh viên đã tồn tại!");
        return;
        }

        const students = this.getStudents();
        const index = students.findIndex((s) => s.id === studentId);

        if (index === -1) {
        this.showMessage("Không tìm thấy sinh viên!");
        return;
        }

        students[index] = { ...students[index], ...formData };
        this.saveStudents(students);
        this.showMessage("Cập nhật sinh viên thành công!");

        // Khôi phục trạng thái ban đầu của form
        const submitBtn = document.getElementById("create-student-btn");
        submitBtn.textContent = "Create Student";
        submitBtn.dataset.mode = "create";
        delete submitBtn.dataset.id;

        this.resetForm();
        this.refreshStudentList();
    }

    /**
     * Xóa sinh viên
     * @param {number} studentId - ID của sinh viên
     */
    deleteStudent(studentId) {
        if (!confirm("Bạn có chắc muốn xóa sinh viên này?")) {
        return;
        }

        const students = this.getStudents();
        const updatedStudents = students.filter((s) => s.id !== studentId);

        this.saveStudents(updatedStudents);
        this.showMessage("Xóa sinh viên thành công!");
        this.refreshStudentList();
    }

    /**
     * Tìm kiếm sinh viên
     * @param {string} keyword - Từ khóa tìm kiếm
     */
    performSearch(keyword) {
        const students = this.getStudents();

        if (!keyword.trim()) {
        this.renderStudentList(students);
        return;
        }

        const searchTerm = keyword.toLowerCase().trim();
        const filteredStudents = students.filter(
        (student) =>
            student.name.toLowerCase().includes(searchTerm) ||
            student.gender.toLowerCase().includes(searchTerm),
        );

        this.renderStudentList(filteredStudents);
    }

    /**
     * Làm mới danh sách sinh viên, giữ nguyên từ khóa tìm kiếm
     */
    refreshStudentList() {
        const searchKeyword = document.getElementById("search-input").value;
        this.performSearch(searchKeyword);
    }

    /**
     * Đặt lại form về trạng thái ban đầu
     */
    resetForm() {
        document.getElementById("student-form").reset();
    }

    /**
     * Hiển thị thông báo
     * @param {string} message - Nội dung thông báo
     */
    showMessage(message) {
        alert(message);
    }
}

// Khởi tạo ứng dụng quản lý sinh viên
document.addEventListener("DOMContentLoaded", () => {
new StudentManager();
});
