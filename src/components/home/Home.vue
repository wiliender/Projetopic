<template>
  <div>

    <h1 class="centralizado">{{ titulo }}</h1>

    <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre pelo título da foto">

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo"/>
        </meu-painel>
      </li>
    </ul>

  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'

export default {

  components: {

    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva
  },

  data() {
    return {
      titulo: "Vue.JS",
      fotos: [],
      filtro: ""
    }
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        // filtra a lista, por enquanto vamos retornar uma lista em branco
        let exp = new RegExp(this.filtro.trim(), "i");//trim() remove os espaços em branco
        return this.fotos.filter(foto => exp.test(foto.titulo));//test() testa se a expressão está contida no titulo
      } else {
        // se o campo estiver vazio, não filtramos, retornamos a lista
        return this.fotos;
      }
    }
  },

  created() {
    this.$http.get("http://localhost:3000/v1/fotos")//executa o metodo get para esse endereço retornando uma promise
        .then(res => res.json())// para retornar uma promis tem que ser atraves da função then
        .then(fotos => this.fotos = fotos, err => console.log(err))//se der certo executa o metodo fotos e se der errado executa o console.log;
        //promise.then(res => {
        //  res.json().then(fotos => this.fotos = fotos);
        //});
  }
}
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}
</style>