export function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 180;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
