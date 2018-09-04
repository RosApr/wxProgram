import request from "./request"
console.log(request)
const api = {
    login: (params) => {
        console.log(params)
        var formData = new FormData();
        for(let [key, value] of Object.entries(params)) {
            formData.append(key, value);
        }
        formData.append("type", "login");
        return request.post("/user/login", formData)
    }
}

export default api