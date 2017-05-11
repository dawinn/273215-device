// глобально
var overlay = document.querySelector(".modal__overlay");
var modal = document.querySelector(".modal");

function windowOpen (popup_window) {
  popup_window.classList.add("modal__window--show");
  modal.classList.add("modal--show");
}
function windowClose (popup_window) {
  popup_window.classList.remove("modal__window--show");
  modal.classList.remove("modal--show");
}

// форма обратной связи
var feedback_link = document.querySelector(".js-feedback");
var feedback_popup = document.querySelector(".feedback-form");

if (feedback_popup) {
  var feedback_close = modal.querySelector(".modal__close");
  var feedback_form = feedback_popup;
  var feedback_form_name = feedback_form.querySelector("#id-name");
  var feedback_form_email = feedback_form.querySelector("#id-email");
  var feedback_form_mailbody = feedback_form.querySelector("#id-mailbody");

  var storage_name = localStorage.getItem("feedback_form_name");
  var storage_email = localStorage.getItem("feedback_form_email");
  var storage_mailbody = localStorage.getItem("feedback_form_mailbody");

  feedback_link.addEventListener("click", function(event) {
    event.preventDefault();
    windowOpen(feedback_popup);

    if (storage_name) {
      feedback_form_name.value = storage_name;
      if (storage_email) {
        feedback_form_email.value = storage_email;
        feedback_form_mailbody.focus();
      } else {
        feedback_form_email.focus();
      }
    } else {
      feedback_form_name.focus();
    }
  });

  feedback_close.addEventListener("click", function (event) {
      event.preventDefault();
      if (feedback_popup.classList.contains("modal__window--show")) {
        modal.classList.remove("modal-error");
        feedback_form_name.classList.remove("field-error");
        feedback_form_email.classList.remove("field-error");
        feedback_form_mailbody.classList.remove("field-error");
        windowClose(feedback_popup);
      }
  });

  feedback_form.addEventListener("submit",function(event){
    if (!feedback_form_name.value || !feedback_form_email.value || !feedback_form_mailbody.value) {
      event.preventDefault();

      modal.classList.remove("modal-error");
      modal.offsetWidth = feedback_popup.offsetWidth;
      modal.classList.add("modal-error");

      if (!feedback_form_name.value) {
        feedback_form_name.classList.remove("field-error");
        feedback_form_name.offsetWidth = feedback_form_name.offsetWidth;
        feedback_form_name.classList.add("field-error");
      }

      if (!feedback_form_email.value) {
        feedback_form_email.classList.remove("field-error");
        feedback_form_email.offsetWidth = feedback_form_email.offsetWidth;
        feedback_form_email.classList.add("field-error");
      }

      if (!feedback_form_mailbody.value) {
        feedback_form_mailbody.classList.remove("field-error");
        feedback_form_mailbody.offsetWidth = feedback_form_mailbody.offsetWidth;
        feedback_form_mailbody.classList.add("field-error");
      }
    } else {
      localStorage.setItem("feedback_form_name", feedback_form_name.value);
      localStorage.setItem("feedback_form_email", feedback_form_email.value);
      localStorage.setItem("feedback_form_mailbody", feedback_form_mailbody.value);
    }
  });
}


// popup карта
var map_link = document.querySelector(".js-map");
var map_popup = document.querySelector(".map");
if (map_popup) {
  var map_close = modal.querySelector(".modal__close");

  map_link.addEventListener("click", function(event) {
    event.preventDefault();
    windowOpen(map_popup);
  });
  map_close.addEventListener("click", function(event) {
    event.preventDefault();
    windowClose(map_popup);
  });
}

// общие нажание ESC и клик по overlay

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (feedback_popup) {
      if (feedback_popup.classList.contains("modal__window--show")) {
        modal.classList.remove("modal-error");
        feedback_form_name.classList.remove("field-error");
        feedback_form_email.classList.remove("field-error");
        feedback_form_mailbody.classList.remove("field-error");
        windowClose(feedback_popup);
      }
    }
    if (map_popup) {
      if (map_popup.classList.contains("modal__window--show")) {
        windowClose(map_popup);
      }
    }
  }
});

overlay.addEventListener ("click", function(event){
  if (feedback_popup) {
    if (feedback_popup.classList.contains("modal__window--show")) {
      modal.classList.remove("modal-error");
      feedback_form_name.classList.remove("field-error");
      feedback_form_email.classList.remove("field-error");
      feedback_form_mailbody.classList.remove("field-error");
      windowClose(feedback_popup);
    }
  }

  if (map_popup) {
    if (map_popup.classList.contains("modal__window--show")) {
      windowClose(map_popup);
    }
  }
});
