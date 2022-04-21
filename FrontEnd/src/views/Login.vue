<template>
    <main class="container">
        <section class="Form">  
            <form @submit.prevent="handleSubmit">
                <p class="text-center"><img src="../assets/login.png" alt="login logo" style="width:10rem" /></p>
                <h1 class="text-center font-weight-bold" style="font-size:0.7rem;">CONNEXION</h1>
                <div class="form-group">
                    <label for="inputEmail">Email:</label>
                    <input v-on:keydown="isInvalid = false" v-model="inputEmail" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Entrez votre email">    
                    <span id="emailHelp" class="form-text font-italic">Modifié l'adresse mail</span>
                </div>
                <div class="form-group">
                    <label for="inputPassword">Mot de passe:</label>
                    <input v-on:keydown="isInvalid = false" v-model="inputPassword" type="password" class="form-control" id="inputPassword" aria-describedby="passwordHelp" placeholder="Entrez votre mot de passe">                        
                    <span id="passwordHelp" class="form-text font-italic">Modifié le mot de passe</span>
                </div>
                <button type="submit" class="submitBtn text-white shadow font-weight-bold">SE CONNECTER</button>
            </form>
        </section>
        <div v-show="isInvalid" class="invalidBox" key="invalid">
            Veuillez vérifier vos informations de connexion.
        </div>
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";
import "../main.css";
export default {
    name: "Accueil",
    data() {
        return {
            inputEmail: "",
            inputPassword: "",
            isInvalid: false
        }
    },
    methods: {
        handleSubmit() {
            if ( !this.inputEmail || !this.inputPassword ) {
                    return this.isInvalid = true;
                }
            axios.post("http://localhost:3000/api/auth/login", { 
                email :     this.inputEmail,
                password:   this.inputPassword
             })
            .then(function (res) {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("userId", res.data.userId)
                localStorage.setItem("userName",res.data.userName)
                localStorage.setItem("role", res.data.role)
                window.alert('connexion réussie, redirection vers la page principale');
                router.push({ path : 'Home'});
            })
            .catch((error) => {
                this.isInvalid = true;
                console.log(error);
            })         
        }
    }
}    
</script>