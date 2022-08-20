<template>
  <div class="mx-4 md:mx-1">
    <main-title />
    <slot />
    <Footer />
  </div>
  <Loading />
</template>

<script setup>
import MainTitle from "./MainTitle"
import Footer from "~/components/Footer"
import Loading from "~/components/Loading"
</script>