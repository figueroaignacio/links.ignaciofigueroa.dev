let avatarClicks = 0

const avatar = document.querySelector('.profile__avatar')
avatar.addEventListener('click', () => {
  avatarClicks++
  avatar.style.transform = `scale(${1 + avatarClicks * 0.05})`
  if (avatarClicks >= 5) {
    window.location.href = './secret.html'
  }
})
