
class UsersService {
    async getUsers() {
        var url = 'http://localhost:4000/api/users?orderby=account_level';
        var res = await fetch(url);
        return res.json();
    }
    
}

export default new UsersService();