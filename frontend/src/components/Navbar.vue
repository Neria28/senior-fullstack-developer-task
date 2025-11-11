<template>
  <nav class="navbar">
    <router-link v-if="!isLoggedIn" to="/" class="hover:text-gray-300"
      >Login</router-link
    >
    <router-link v-if="isLoggedIn" to="/home" class="hover:text-gray-300"
      >Home</router-link
    >
    <router-link v-if="isAdmin" to="/admin" class="hover:text-gray-300"
      >Admin</router-link
    >
    <router-link
      v-if="isEditor || isAdmin"
      to="/editor"
      class="hover:text-gray-300"
      >Editor</router-link
    >
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const isLoggedIn = computed(() => store.getters.isLoggedIn);
const userRoles = computed(() => store.getters.getUserRoles);

const isAdmin = computed(
  () => isLoggedIn.value && userRoles.value.includes("Admin")
);
const isEditor = computed(
  () => isLoggedIn.value && userRoles.value.includes("Editor")
);

</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  width: 350px;
  margin: 0 auto;
  align-items: center;
}

.router-link-active {
  text-decoration: underline;
}

button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
}
</style>
