export default function About() {
  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-3xl sm:text-4xl font-bold">About</h1>
      <p className="text-base sm:text-lg">
        MORQ is dedicated to the making of architecture: meaningful spaces
        within essential and thoughtful buildings. In dialogue with existing
        conditions, whether natural or built, we seek to produce work that
        engages the senses, stimulates the mind, and contributes positively to
        the built environment.
      </p>
      <img
        src="https://source.unsplash.com/random/800x600?studio"
        alt="About MORQ"
        className="w-full h-64 sm:h-96 object-cover rounded-lg"
      />
    </div>
  );
}
