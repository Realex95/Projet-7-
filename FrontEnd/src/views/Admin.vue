<template>
    <div class="container">    
        <main class="col-12">
            <section class="col-12">
                <h1 class="btn btn-block btn-danger font-weight-bold" style="cursor:default">Administration du site</h1>
                 <Home></Home>
            </section>
            <section id="filPrincipal" class="row">
                <div class="col-12 col-md-4">
                    <article class="card bg-light" style="float:none;">
                        <div class="card-body text-center">
                            <div class="dropdown text-center">
                                <p>Membre depuis le {{ creation }}</p>
                            </div>
                            <div>
                                <div v-if="isAdmin">
                                    <router-link to='/Admin'><button v-if="isAdmin" type="button"  class="btn btn-danger">VOUS ÊTES L'ADMINISTRATEUR DU SITE</button></router-link> 
                                    <router-link to='/Admin'><button  type="button"   class="btn btn-danger buttonsPanel">ACTIVÉE</button></router-link> 
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <button class="btn text-white font-weight-bold" style="background-color: #dd0000;cursor: default">Vous pouvez supprimés les messages des utilisateurs contraniant</button>
                        </div>
                    </article>
                </div>
                <article class="col-md-8">
                    <h2 class="text-white text-center">Choissiez l'utilisateurs</h2>
                    <div class="row justify-content-around">
                        <button @click="toUsersList()" class="btn shadow font-weight-bold" >USERS</button>
                    </div>
                </article>
            </section>
        </main>
    </div>
</template>

<script>
import Home from "../composant/Home";
import axios from "axios";
import router from "../router";
import "../main.css";
export default {
    name: "Admin",
    components: {
      Home
    },
    data() {
        return {
            isAdmin: false,
            nameCurrentUser: "",
            creation: ""
        }
    },
    created: function() {        
        let id          = localStorage.getItem('userId');
        let self        = this;  
        axios.get("http://localhost:3000/api/users/" + id, { headers: {"Authorization": "Bearer" + localStorage.getItem("token")} })
        .then(res => {
            self.isAdmin  = res.data.isAdmin;     
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
        toUsersList() {
            router.replace("http://localhost:8080/api/UsersList")
        }
    }
}
</script>