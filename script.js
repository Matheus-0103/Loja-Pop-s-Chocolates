// auth.js
class AuthService {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('chocUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }

    register(user) {
        const exists = this.users.some(u => u.email === user.email);
        if (exists) throw new Error('E-mail já cadastrado');
        
        const newUser = {
            ...user,
            id: Date.now().toString(),
            isAdmin: user.email.includes('@admin.')
        };
        
        this.users.push(newUser);
        localStorage.setItem('chocUsers', JSON.stringify(this.users));
        return newUser;
    }

    login(email, password) {
        const user = this.users.find(u => 
            u.email === email && u.password === password
        );
        if (!user) throw new Error('Credenciais inválidas');
        
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
}

const authService = new AuthService();
