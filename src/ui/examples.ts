// C语言示例代码
export const C_EXAMPLES = {
  basic: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 宏定义
#define MAX_SIZE 100
#define PI 3.14159
#define MIN(a, b) ((a) < (b) ? (a) : (b))

// 枚举定义
typedef enum {
    STATUS_OK,
    STATUS_ERROR,
    STATUS_PENDING
} StatusCode;

// 结构体定义
typedef struct {
    int id;
    char name[50];
    float score;
} Student;

// 函数声明
void print_array(int arr[], int size);
Student* create_student(int id, const char* name, float score);
void process_students(Student students[], int count);

// 全局变量
int global_counter = 0;

int main() {
    // 数组操作
    int numbers[MAX_SIZE];
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    // 指针操作
    int* ptr = numbers;
    char* message = "Hello, World!";
    
    // 复杂的switch case
    StatusCode status = STATUS_OK;
    switch (status) {
        case STATUS_OK:
            printf("Operation successful\\n");
            break;
        case STATUS_ERROR:
            printf("Operation failed\\n");
            break;
        case STATUS_PENDING:
            printf("Operation pending\\n");
            break;
        default:
            printf("Unknown status\\n");
    }
    
    // 复杂的条件判断
    for (int i = 0; i < MAX_SIZE; i++) {
        if (i % 2 == 0) {
            numbers[i] = i * 2;
        } else if (i % 3 == 0) {
            numbers[i] = i * 3;
        } else {
            numbers[i] = i;
        }
        
        // 嵌套条件
        if (i > 50) {
            if (i % 5 == 0) {
                printf("Special number: %d\\n", i);
            }
        }
    }
    
    // 函数指针数组
    int (*func_ptr_array[3])(int, int) = {NULL};
    
    // 复杂的while循环
    int count = 0;
    while (count < 10) {
        do {
            printf("Count: %d\\n", count);
            count++;
        } while (count < 5);
    }
    
    // 位操作
    unsigned int flags = 0x0F;
    flags |= (1 << 4);  // 设置第4位
    flags &= ~(1 << 2); // 清除第2位
    
    return 0;
}

// 函数实现
void print_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

Student* create_student(int id, const char* name, float score) {
    Student* student = (Student*)malloc(sizeof(Student));
    if (student != NULL) {
        student->id = id;
        strncpy(student->name, name, sizeof(student->name) - 1);
        student->name[sizeof(student->name) - 1] = '\\0';
        student->score = score;
    }
    return student;
}

void process_students(Student students[], int count) {
    for (int i = 0; i < count; i++) {
        printf("Student ID: %d, Name: %s, Score: %.2f\\n", 
               students[i].id, students[i].name, students[i].score);
    }
}`,

  advanced: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <math.h>

// 复杂宏定义
#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))
#define LOG_ERROR(fmt, ...) fprintf(stderr, "[ERROR] " fmt "\\n", ##__VA_ARGS__)
#define LOG_INFO(fmt, ...) printf("[INFO] " fmt "\\n", ##__VA_ARGS__)

// 位域结构体
typedef struct {
    unsigned int is_active : 1;
    unsigned int has_data : 1;
    unsigned int priority : 3;
    unsigned int reserved : 3;
} StatusFlags;

// 联合体
typedef union {
    int i;
    float f;
    char c[4];
} DataUnion;

// 复杂枚举
typedef enum {
    COLOR_RED = 0xFF0000,
    COLOR_GREEN = 0x00FF00,
    COLOR_BLUE = 0x0000FF,
    COLOR_YELLOW = 0xFFFF00,
    COLOR_CYAN = 0x00FFFF,
    COLOR_MAGENTA = 0xFF00FF
} Color;

// 函数指针类型
typedef int (*CompareFunc)(const void*, const void*);
typedef void (*CallbackFunc)(int, void*);

// 递归函数
int factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 复杂算法：快速排序
void quick_sort(int arr[], int left, int right) {
    if (left >= right) return;
    
    int pivot = arr[(left + right) / 2];
    int i = left, j = right;
    
    while (i <= j) {
        while (arr[i] < pivot) i++;
        while (arr[j] > pivot) j--;
        
        if (i <= j) {
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
    }
    
    quick_sort(arr, left, j);
    quick_sort(arr, i, right);
}

// 复杂数据结构：链表
typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* create_node(int data) {
    Node* node = (Node*)malloc(sizeof(Node));
    if (node) {
        node->data = data;
        node->next = NULL;
    }
    return node;
}

void insert_node(Node** head, int data) {
    Node* new_node = create_node(data);
    if (!*head) {
        *head = new_node;
    } else {
        Node* current = *head;
        while (current->next) {
            current = current->next;
        }
        current->next = new_node;
    }
}

// 复杂的回调函数示例
void process_array(int arr[], int size, CallbackFunc callback, void* user_data) {
    for (int i = 0; i < size; i++) {
        callback(arr[i], user_data);
    }
}

void print_callback(int value, void* user_data) {
    printf("Value: %d, User data: %p\\n", value, user_data);
}

// 复杂的错误处理
typedef enum {
    ERROR_NONE = 0,
    ERROR_MEMORY,
    ERROR_INVALID_PARAM,
    ERROR_TIMEOUT,
    ERROR_UNKNOWN
} ErrorCode;

ErrorCode complex_operation(int input, int* output) {
    if (!output) return ERROR_INVALID_PARAM;
    if (input < 0) return ERROR_INVALID_PARAM;
    
    int* buffer = (int*)malloc(input * sizeof(int));
    if (!buffer) return ERROR_MEMORY;
    
    // 模拟复杂处理
    for (int i = 0; i < input; i++) {
        buffer[i] = i * i;
    }
    
    *output = buffer[input - 1];
    free(buffer);
    
    return ERROR_NONE;
}

int main() {
    // 复杂变量声明和初始化
    int numbers[] = {64, 34, 25, 12, 22, 11, 90};
    int size = ARRAY_SIZE(numbers);
    
    // 使用宏
    LOG_INFO("Starting program with %d elements", size);
    
    // 位域操作
    StatusFlags flags = {0};
    flags.is_active = 1;
    flags.priority = 3;
    
    // 联合体使用
    DataUnion data;
    data.i = 0x12345678;
    printf("As int: %d, As float: %f, As hex: 0x%x\\n", data.i, data.f, data.i);
    
    // 复杂条件判断
    for (int i = 0; i < size; i++) {
        if (numbers[i] % 2 == 0) {
            if (numbers[i] > 50) {
                LOG_INFO("Large even number: %d", numbers[i]);
            } else {
                LOG_INFO("Small even number: %d", numbers[i]);
            }
        } else {
            LOG_INFO("Odd number: %d", numbers[i]);
        }
    }
    
    // 使用函数指针
    int result = factorial(5);
    printf("Factorial of 5: %d\\n", result);
    
    // 排序数组
    quick_sort(numbers, 0, size - 1);
    LOG_INFO("Sorted array:");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");
    
    // 链表操作
    Node* head = NULL;
    for (int i = 1; i <= 5; i++) {
        insert_node(&head, i * 10);
    }
    
    // 回调函数使用
    process_array(numbers, size, print_callback, NULL);
    
    // 错误处理示例
    int output;
    ErrorCode error = complex_operation(10, &output);
    if (error != ERROR_NONE) {
        LOG_ERROR("Operation failed with error code: %d", error);
    } else {
        LOG_INFO("Operation succeeded, output: %d", output);
    }
    
    // 复杂的switch-case
    Color color = COLOR_RED;
    switch (color) {
        case COLOR_RED:
            printf("Red color selected\\n");
            break;
        case COLOR_GREEN:
            printf("Green color selected\\n");
            break;
        case COLOR_BLUE:
            printf("Blue color selected\\n");
            break;
        default:
            printf("Other color selected\\n");
    }
    
    // 内存清理
    while (head) {
        Node* temp = head;
        head = head->next;
        free(temp);
    }
    
    return 0;
}`
};

// C++示例代码
export const CPP_EXAMPLES = {
  basic: `#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <memory>
#include <algorithm>

// 命名空间
namespace myapp {
    namespace utils {
        template<typename T>
void print_vector(const std::vector<T>& vec) {
for (const auto& item : vec) {
std::cout << item << " ";
}
std::cout << std::endl;
}
    }
}

// 类定义
class Person {
private:
    std::string name;
    int age;
    std::vector<std::string> hobbies;
    
public:
// 构造函数
Person(const std::string& name, int age) : name(name), age(age) {}

// 析构函数
~Person() {
std::cout << "Person " << name << " destroyed" << std::endl;
}

// 拷贝构造函数
Person(const Person& other) : name(other.name), age(other.age), hobbies(other.hobbies) {}

// 移动构造函数
Person(Person&& other) noexcept 
: name(std::move(other.name)), age(other.age), hobbies(std::move(other.hobbies)) {}

// 方法
void add_hobby(const std::string& hobby) {
hobbies.push_back(hobby);
}

void print_info() const {
std::cout << "Name: " << name << ", Age: " << age << std::endl;
std::cout << "Hobbies: ";
for (const auto& hobby : hobbies) {
std::cout << hobby << ", ";
}
std::cout << std::endl;
}

// Getter和Setter
std::string get_name() const { return name; }
int get_age() const { return age; }
void set_age(int new_age) { age = new_age; }
};

// 继承和多态
class Shape {
protected:
std::string color;

public:
Shape(const std::string& color) : color(color) {}
virtual ~Shape() = default;

virtual double area() const = 0;
virtual void draw() const {
std::cout << "Drawing a " << color << " shape" << std::endl;
}

std::string get_color() const { return color; }
};

class Circle : public Shape {
private:
double radius;

public:
Circle(double radius, const std::string& color = "red") 
: Shape(color), radius(radius) {}

double area() const override {
return 3.14159 * radius * radius;
}

void draw() const override {
std::cout << "Drawing a " << color << " circle with radius " << radius << std::endl;
}
};

class Rectangle : public Shape {
private:
double width, height;

public:
Rectangle(double width, double height, const std::string& color = "blue") 
: Shape(color), width(width), height(height) {}

double area() const override {
return width * height;
}

void draw() const override {
std::cout << "Drawing a " << color << " rectangle " << width << "x" << height << std::endl;
}
};

// 模板类
template<typename T>
class Container {
private:
std::vector<T> items;

public:
void add(const T& item) {
items.push_back(item);
}

void remove(const T& item) {
items.erase(std::remove(items.begin(), items.end(), item), items.end());
}

size_t size() const {
return items.size();
}

const T& get(size_t index) const {
return items[index];
}

// 迭代器支持
typename std::vector<T>::iterator begin() { return items.begin(); }
typename std::vector<T>::iterator end() { return items.end(); }
typename std::vector<T>::const_iterator begin() const { return items.begin(); }
typename std::vector<T>::const_iterator end() const { return items.end(); }
};

// 模板函数
template<typename T>
T max_value(const T& a, const T& b) {
return (a > b) ? a : b;
}

template<typename T, typename... Args>
T max_value(const T& first, const Args&... args) {
return max_value(first, max_value(args...));
}

// Lambda表达式和STL算法
void process_with_lambda() {
std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// 使用lambda进行过滤
auto even_numbers = numbers | std::views::filter([](int n) { return n % 2 == 0; });

// 使用lambda进行转换
std::vector<std::string> strings;
std::transform(numbers.begin(), numbers.end(), std::back_inserter(strings),
   [](int n) { return std::to_string(n); });

// 使用lambda进行排序
std::sort(numbers.begin(), numbers.end(), [](int a, int b) {
return std::abs(a - 5) < std::abs(b - 5);
});
}

// 智能指针和异常处理
class Resource {
private:
std::string name;

public:
Resource(const std::string& name) : name(name) {
std::cout << "Resource " << name << " created" << std::endl;
}

~Resource() {
std::cout << "Resource " << name << " destroyed" << std::endl;
}

void use() {
if (name.empty()) {
throw std::runtime_error("Cannot use empty resource");
}
std::cout << "Using resource: " << name << std::endl;
}
};

int main() {
// 使用命名空间
using namespace myapp::utils;

// 基本类型和容器
std::vector<int> numbers = {5, 2, 8, 1, 9, 3, 7, 4, 6};
std::map<std::string, int> age_map = {
{"Alice", 25},
{"Bob", 30},
{"Charlie", 35}
};

// 排序和使用算法
std::sort(numbers.begin(), numbers.end());
print_vector(numbers);

// 使用智能指针
auto person = std::make_unique<Person>("Alice", 25);
person->add_hobby("Reading");
person->add_hobby("Swimming");
person->print_info();

// 多态使用
std::vector<std::unique_ptr<Shape>> shapes;
shapes.push_back(std::make_unique<Circle>(5.0));
shapes.push_back(std::make_unique<Rectangle>(4.0, 6.0));
shapes.push_back(std::make_unique<Circle>(3.0, "green"));

for (const auto& shape : shapes) {
shape->draw();
std::cout << "Area: " << shape->area() << std::endl;
}

// 模板类使用
Container<std::string> string_container;
string_container.add("Hello");
string_container.add("World");
string_container.add("C++");

for (const auto& item : string_container) {
std::cout << item << " ";
}
std::cout << std::endl;

// 模板函数使用
int max_int = max_value(10, 20, 30, 5, 15);
double max_double = max_value(3.14, 2.71, 1.618);

std::cout << "Max int: " << max_int << std::endl;
std::cout << "Max double: " << max_double << std::endl;

// 异常处理
try {
auto resource = std::make_unique<Resource>("Test Resource");
resource->use();
} catch (const std::exception& e) {
std::cerr << "Exception: " << e.what() << std::endl;
}

// Lambda表达式
auto lambda = [](int x, int y) { return x + y; };
std::cout << "Lambda result: " << lambda(5, 3) << std::endl;

// 复杂的条件表达式
for (int num : numbers) {
std::string result = (num % 2 == 0) ? 
((num > 5) ? "Large even" : "Small even") : 
((num > 5) ? "Large odd" : "Small odd");
std::cout << num << ": " << result << std::endl;
}

return 0;
}`,

  advanced: `#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <map>
#include <set>
#include <queue>
#include <stack>
#include <algorithm>
#include <numeric>
#include <functional>
#include <variant>
#include <optional>
#include <any>
#include <filesystem>
#include <chrono>
#include <thread>
#include <mutex>
#include <future>
#include <regex>
#include <complex>
#include <valarray>
#include <tuple>
#include <array>

// 高级模板元编程
template<int N>
struct Factorial {
static constexpr int value = N * Factorial<N - 1>::value;
};

template<>
struct Factorial<0> {
static constexpr int value = 1;
};

// SFINAE示例
template<typename T>
typename std::enable_if<std::is_integral<T>::value, void>::type
print_integral(T value) {
std::cout << "Integral value: " << value << std::endl;
}

template<typename T>
typename std::enable_if<std::is_floating_point<T>::value, void>::type
print_integral(T value) {
std::cout << "Floating point value: " << value << std::endl;
}

// 可变参数模板
template<typename... Args>
void print_all(Args&&... args) {
((std::cout << args << " "), ...);
std::cout << std::endl;
}

// 完美转发
template<typename T>
void forward_example(T&& arg) {
process(std::forward<T>(arg));
}

// 高级类设计
class ThreadPool {
private:
std::vector<std::thread> workers;
std::queue<std::function<void()>> tasks;
std::mutex queue_mutex;
std::condition_variable condition;
bool stop;

public:
explicit ThreadPool(size_t threads) : stop(false) {
for (size_t i = 0; i < threads; ++i) {
workers.emplace_back([this] {
while (true) {
std::function<void()> task;
{
std::unique_lock<std::mutex> lock(queue_mutex);
condition.wait(lock, [this] { return stop || !tasks.empty(); });
if (stop && tasks.empty()) return;
task = std::move(tasks.front());
tasks.pop();
}
                task();
                }
            });
        }
}

template<class F, class... Args>
auto enqueue(F&& f, Args&&... args) 
-> std::future<typename std::result_of<F(Args...)>::type> {
using return_type = typename std::result_of<F(Args...)>::type;

auto task = std::make_shared<std::packaged_task<return_type()>>(
std::bind(std::forward<F>(f), std::forward<Args>(args)...)
);

std::future<return_type> res = task->get_future();
{
std::unique_lock<std::mutex> lock(queue_mutex);
if (stop) throw std::runtime_error("enqueue on stopped ThreadPool");
tasks.emplace([task]() { (*task)(); });
}
condition.notify_one();
return res;
}

~ThreadPool() {
{
std::unique_lock<std::mutex> lock(queue_mutex);
stop = true;
}
condition.notify_all();
for (std::thread& worker : workers) {
worker.join();
}
}
};

// 复杂的STL使用
class DataProcessor {
private:
std::map<std::string, std::vector<int>> data_map;
std::set<std::string> unique_keys;

public:
void add_data(const std::string& key, const std::vector<int>& values) {
data_map[key] = values;
unique_keys.insert(key);
}

std::vector<int> process_data(const std::string& key, 
 std::function<int(int)> processor) {
if (data_map.find(key) == data_map.end()) {
return {};
}

std::vector<int> result;
std::transform(data_map[key].begin(), data_map[key].end(),
  std::back_inserter(result), processor);
return result;
}

// 使用std::variant处理多种类型
using DataValue = std::variant<int, double, std::string>;

void process_variant(const std::vector<DataValue>& values) {
for (const auto& value : values) {
std::visit([](const auto& val) {
std::cout << "Processing: " << val << std::endl;
}, value);
}
}

// 使用std::optional
std::optional<int> find_value(const std::string& key) {
auto it = data_map.find(key);
if (it != data_map.end() && !it->second.empty()) {
return it->second[0];
}
return std::nullopt;
}
};

// 并发和异步编程
class AsyncProcessor {
private:
ThreadPool pool;

public:
AsyncProcessor() : pool(4) {}

std::future<int> async_computation(int a, int b) {
return pool.enqueue([a, b] {
std::this_thread::sleep_for(std::chrono::milliseconds(100));
return a * b;
});
}

std::future<std::string> async_string_process(const std::string& input) {
return pool.enqueue([input] {
std::string result = input;
std::reverse(result.begin(), result.end());
return result;
});
}
};

// 正则表达式处理
class TextProcessor {
private:
std::vector<std::regex> patterns;

public:
void add_pattern(const std::string& pattern_str) {
patterns.emplace_back(pattern_str);
}

std::vector<std::string> extract_matches(const std::string& text) {
std::vector<std::string> matches;
for (const auto& pattern : patterns) {
std::sregex_iterator begin(text.begin(), text.end(), pattern);
std::sregex_iterator end;

        for (auto it = begin; it != end; ++it) {
                matches.push_back(it->str());
            }
        }
        return matches;
}
};

// 复杂数学运算
class MathOperations {
public:
// 使用std::complex
std::complex<double> complex_operation(std::complex<double> a, 
  std::complex<double> b) {
return a * b + std::conj(a) / b;
}

// 使用std::valarray
std::valarray<double> array_operation(const std::valarray<double>& arr) {
return arr.apply([](double x) { return x * x; });
}

// 矩阵运算
using Matrix = std::vector<std::vector<double>>;

Matrix matrix_multiply(const Matrix& a, const Matrix& b) {
if (a.empty() || b.empty() || a[0].size() != b.size()) {
throw std::invalid_argument("Invalid matrix dimensions");
}

Matrix result(a.size(), std::vector<double>(b[0].size(), 0.0));

for (size_t i = 0; i < a.size(); ++i) {
for (size_t j = 0; j < b[0].size(); ++j) {
for (size_t k = 0; k < b.size(); ++k) {
result[i][j] += a[i][k] * b[k][j];
}
}
}

return result;
}
};

// 文件系统操作
class FileSystemManager {
public:
void process_directory(const std::filesystem::path& dir_path) {
for (const auto& entry : std::filesystem::directory_iterator(dir_path)) {
if (entry.is_regular_file()) {
std::cout << "File: " << entry.path().filename() 
 << " Size: " << entry.file_size() << " bytes" << std::endl;
} else if (entry.is_directory()) {
std::cout << "Directory: " << entry.path().filename() << std::endl;
}
}
}

std::vector<std::string> find_files_by_pattern(
const std::filesystem::path& dir_path, 
const std::string& pattern) {

std::vector<std::string> results;
std::regex file_pattern(pattern);

for (const auto& entry : std::filesystem::recursive_directory_iterator(dir_path)) {
if (entry.is_regular_file()) {
std::string filename = entry.path().filename().string();
if (std::regex_search(filename, file_pattern)) {
results.push_back(entry.path().string());
}
}
}

return results;
}
};

// 高级Lambda和函数式编程
class FunctionalProgramming {
public:
void demonstrate_functional() {
std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// 复合函数
auto square = [](int x) { return x * x; };
auto increment = [](int x) { return x + 1; };
auto compose = [](auto f, auto g) {
return [f, g](auto x) { return f(g(x)); };
};

auto square_then_increment = compose(increment, square);
auto increment_then_square = compose(square, increment);

std::vector<int> transformed;
std::transform(numbers.begin(), numbers.end(), 
  std::back_inserter(transformed), square_then_increment);

// 使用std::function和std::bind
std::function<int(int)> bound_function = std::bind(
[](int a, int b, int c) { return a + b + c; }, 10, 20, std::placeholders::_1);

// 使用std::tuple和std::apply
auto tuple_example = std::make_tuple(1, 2, 3, 4, 5);
auto sum_tuple = [](auto... args) { return (args + ...); };
int total = std::apply(sum_tuple, tuple_example);

// 使用std::reduce和std::transform_reduce
int sum = std::reduce(numbers.begin(), numbers.end());
int product = std::transform_reduce(
numbers.begin(), numbers.end(), 1, 
std::multiplies<>(), square);
}
};

int main() {
// 模板元编程
constexpr int fact_5 = Factorial<5>::value;
std::cout << "Factorial<5> = " << fact_5 << std::endl;

// SFINAE
print_integral(42);
print_integral(3.14);

// 可变参数模板
print_all(1, 2.5, "hello", 'a');

// 线程池使用
ThreadPool pool(4);

auto future1 = pool.enqueue([](int a, int b) {
return a + b;
}, 10, 20);

auto future2 = pool.enqueue([]() {
std::this_thread::sleep_for(std::chrono::seconds(1));
return "Task completed";
});

std::cout << "Future1 result: " << future1.get() << std::endl;
std::cout << "Future2 result: " << future2.get() << std::endl;

// 复杂STL使用
DataProcessor processor;
processor.add_data("numbers", {1, 2, 3, 4, 5});
processor.add_data("squares", {1, 4, 9, 16, 25});

auto doubled = processor.process_data("numbers", [](int x) { return x * 2; });

// Variant使用
std::vector<DataProcessor::DataValue> mixed_data = {
42, 3.14, std::string("hello"), 100
};
processor.process_variant(mixed_data);

// Optional使用
auto value = processor.find_value("numbers");
if (value) {
std::cout << "Found value: " << *value << std::endl;
} else {
std::cout << "Value not found" << std::endl;
}

// 异步处理
AsyncProcessor async_processor;
auto async_result = async_processor.async_computation(5, 7);
auto async_string = async_processor.async_string_process("Hello World");

std::cout << "Async result: " << async_result.get() << std::endl;
std::cout << "Async string: " << async_string.get() << std::endl;

// 正则表达式
TextProcessor text_processor;
text_processor.add_pattern(R"(\b\d+\b)");  // 匹配数字
text_processor.add_pattern(R"(\b[A-Z][a-z]+\b)");  // 匹配首字母大写的单词

std::string sample_text = "The price is 123 dollars and 45 cents. John bought 2 items.";
auto matches = text_processor.extract_matches(sample_text);

// 复杂数学运算
MathOperations math_ops;
std::complex<double> c1(1.0, 2.0);
std::complex<double> c2(3.0, 4.0);
auto complex_result = math_ops.complex_operation(c1, c2);

std::valarray<double> array = {1.0, 2.0, 3.0, 4.0, 5.0};
auto array_result = math_ops.array_operation(array);

// 函数式编程
FunctionalProgramming fp;
fp.demonstrate_functional();

// 高级并发
std::vector<std::future<int>> futures;
for (int i = 0; i < 10; ++i) {
futures.push_back(pool.enqueue([i] {
std::this_thread::sleep_for(std::chrono::milliseconds(100));
return i * i;
    }));
    }
    
    for (auto& f : futures) {
        std::cout << "Result: " << f.get() << std::endl;
    }
    
    // 文件系统操作
    FileSystemManager fs_manager;
    try {
        fs_manager.process_directory(std::filesystem::current_path());
    } catch (const std::exception& e) {
        std::cerr << "File system error: " << e.what() << std::endl;
    }
    
    return 0;
}`
};

// 获取默认示例代码
export const getDefaultExample = (language: 'c' | 'cpp', level: 'basic' | 'advanced' = 'basic') => {
  if (language === 'c') {
    return C_EXAMPLES[level];
  } else {
    return CPP_EXAMPLES[level];
  }
};
