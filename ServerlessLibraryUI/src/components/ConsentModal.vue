<template>
  <div class="modal-backdrop bordershading">
    <div class="modal modalshadow">
      <header class="modal-header">
        <slot name="header">
          Just in case you did not know already..

          <button
            type="button"
            class="btn-close"
            @click="close"
          >
            x
          </button>    
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
            <p class="modal-body-content" >
            Each Function app or Logic app is licensed to you under a license agreement by its owner, not Microsoft. Microsoft is not responsible for code provided & licensed by the community members and does not screen for security, compatibility or performance. The function or logic apps are not supported under any Microsoft support program or service. The function or logic apps are provided AS IS without warranty of any kind.
            </p>
        </slot>
       </section>
       <footer class="modal-footer">
          <slot name="footer">
             <button
              type="button"
              class="btn-agree"
              @click="outboundRepoClick(repository)"
              v-on:contextmenu="outboundRepoClick(repository)"
            >
              I agree
          </button>
           <button
              type="button"
              class="btn-cancel"
              @click="close"
            >
              Cancel
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
    armtemplateUrl: String,
  },

  methods: {
    close() {
      this.$emit('close');
    },

    outboundRepoClick(repo) {
      fetch('https://www.serverlesslibrary.net/api/Library'
      , {
          method: 'PUT',
          body:'"' + repo + '"',
          headers: {
          "Content-Type": "application/json"
          },
        })
        .then(response => response.body)
        .catch((err)=>console.error(err.message));
        this.$emit('close');
        window.open('https://portal.azure.com/#create/Microsoft.Template/uri/' + encodeURIComponent(repo), '_blank')
    },
  },
};
</script>

<style>
  .modal-backdrop {
     position: fixed;
     top: 0;
     bottom: 0;
     left: 22%;
     right: 22%;
     background-color: #252525;
     display: flex;
     justify-content: center;
     align-items: center;
}
 .modal {
     padding-left: 24px;
     padding-right: 20px;
     padding-top: 15px;
     background: #FFFFFF;
     overflow-x: auto;
     display: flex;
     flex-direction: column;
}
 .modal-header, .modal-footer {
     display: flex;
}
 .modal-header {
     color: rgb(0, 0, 0);
     justify-content: space-between;
     font-size: 16px;
     font-weight: bold;
}
 .modal-footer {
     margin-bottom: 20px;
     margin-top: 12px;
     justify-content: flex-start;
}
 .modal-body {
     position: relative;
     margin-top:6px;
}
 .modal-body-content {
     text-align:left;
     color: #626161;
     font-size: 12px;
     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
 .btn-close {
     border: none;
     font-size: 16px;
     cursor: pointer;
     font-weight: bold;
     color: #000;
     background: transparent;
     opacity: 1;
}
 .btn-cancel, .btn-agree {
     border: 1px solid #0E53F4;
     opacity: 1;
     width: 125px;
     height: 30px;
     margin-right: 12px;
     font-weight: bold;
     font-size: 12px;
}
 .btn-cancel {
     color: #0E53F4;
     background:#FFFFFF;
}
 .btn-agree {
     color: white;
     background:#0E53F4;
}
 .modal-enter {
     opacity: 0;
}
 .modal-leave-active {
     opacity: 0;
}
 .modal-enter .modal-container, .modal-leave-active .modal-container {
     -webkit-transform: scale(1.1);
     transform: scale(1.1);
}
.bordershading{
background-color:transparent;
}
.modalshadow{
 box-shadow: 5px 5px 1px #CFCFCF!important
}
</style>
