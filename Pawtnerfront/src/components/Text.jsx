import doguinho from '../assets/doguinho.png';

export default function Text({ textSectionRef }) {
  return (
    <div ref={textSectionRef} className="text-section">
      <p>
        Animal abuse and the struggle of stray animals are urgent issues
        affecting communities worldwide. Countless animals roam the streets
        without shelter, food, or medical care, while many cases of abuse go
        unnoticed due to a lack of accessible reporting tools. These challenges
        extend beyond animals—they reflect deeper societal issues that demand
        immediate action.
      </p>

      <p>✦With Pawtner, YOU can make a difference✦</p>

      <p>
        We've created an innovative platform that connects compassionate
        individuals who want to take action for animal welfare. Our mission is
        to make animal rescue and protection faster, more efficient, and more
        accessible to everyone.
      </p>

      <p>Through Pawtner, users can:</p>

      <p>
        <ul>
          <li>
            Report animal abuse with detailed descriptions, photos, and precise
            location data, enabling authorities and organizations to respond
            effectively.
          </li>

          <li>
            Report lost or found animals, sharing descriptions and images to
            facilitate reunions or rescues.
          </li>

          <li>
            Access an interactive map that displays real-time reports, fostering
            community engagement and collaboration.
          </li>
        </ul>
      </p>

      <p>
        Pawtner is more than just an app—it is a movement to bridge the gap
        between compassion and action. Together, we can make a difference, one
        report at a time. Join us in creating a world where every animal is
        safe, cared for, and loved.
      </p>
      <p>Every report, every share,every rescue matters!</p>

     <div className="image-doguinho">
                <img src={doguinho} alt="img" className='doguinho' />
                
                </div>

    </div>
  );
}
