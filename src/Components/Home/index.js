import { useRef } from 'react';
import styles from './home.module.css';
import { ModalAlert } from 'Components/Shared';
import { useState } from 'react';

function Home() {
  const nameInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const [msg, setMsg] = useState('');
  const [modalDone, setModalDone] = useState(false);

  const handleReset = () => {
    if (nameInputRef.current) {
      nameInputRef.current.value = '';
    }
    if (messageInputRef.current) {
      messageInputRef.current.value = '';
    }
    if (emailInputRef.current) {
      emailInputRef.current.value = '';
    }
  };

  const onSubmit = () => {
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    if (name.trim() === '' || email.trim() === '') {
      setMsg('Please enter a name and email');
      setModalDone(true);
    } else {
      setMsg('Form submitted successfully');
      setModalDone(true);
    }
  };
  return (
    <>
      <section className={styles.container}>
        <div className={styles.mainTitle}>
          <h1>
            <spam>MEGAROCKET</spam> by RadiumRocket
          </h1>
          <h2>AN EASY SYSTEM TO TRACK YOUR TEAM´S TIMES AND PROJECTS</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when
          </p>
          <div className={styles.learnMore}>
            <a href="https://www.facebook.com/radiumrocket">
              <button className={styles.mainBtn}>Learn More</button>
            </a>
          </div>
        </div>
        <div className={styles.mainImg}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/randomLogo.png`}></img>
        </div>
      </section>
      <section className={styles.sectionServices}>
        <h3>SERVICES</h3>
        <div className={styles.containerServices}>
          <article className={styles.services}>
            <div className={styles.servicesMedia}>
              <img src={`${process.env.PUBLIC_URL}/assets/images/time.png`}></img>
            </div>
            <div className={styles.servicesText}>
              <h4>Hour Registry</h4>
              <p>
                Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam
                facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.
              </p>
            </div>
          </article>
          <article className={styles.services}>
            <div className={styles.servicesMedia}>
              <img src={`${process.env.PUBLIC_URL}/assets/images/archive.png`}></img>
            </div>
            <div className={styles.servicesText}>
              <h4>Reports</h4>
              <p>
                Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam
                facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.
              </p>
            </div>
          </article>
          <article className={styles.services}>
            <div className={styles.servicesMedia}>
              <img src={`${process.env.PUBLIC_URL}/assets/images/folders.png`}></img>
            </div>
            <div className={styles.servicesText}>
              <h4>Resource Managments</h4>
              <p>
                Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam
                facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.
              </p>
            </div>
          </article>
          <article className={styles.services}>
            <div className={styles.servicesMedia}>
              <img src={`${process.env.PUBLIC_URL}/assets/images/dashboard.png`}></img>
            </div>
            <div className={styles.servicesText}>
              <h4>Multiple Roles</h4>
              <p>
                Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam
                facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className={styles.sectionTrackgenix}>
        <h3>WHY TRACKGENIX?</h3>
        <div className={styles.artTrack}>
          <article>
            <img src={`${process.env.PUBLIC_URL}/assets/images/trackgenix.png`}></img>
            <h4>Productivity enhancement</h4>
            <p>
              Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam
              facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.
            </p>
            <a href="https://www.facebook.com/radiumrocket">
              <button>More</button>
            </a>
          </article>
          <article>
            <img src={`${process.env.PUBLIC_URL}/assets/images/trackgenix.png`}></img>
            <h4>Work tracebility</h4>
            <p>
              Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam
              facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.
            </p>
            <a href="https://www.facebook.com/radiumrocket">
              <button>More</button>
            </a>
          </article>
        </div>
      </section>
      <section className={styles.sectionRequestInformation}>
        <h3>REQUEST SYSTEM INFORMATION</h3>
        <form className={styles.information}>
          <div className={styles.informationForm}>
            <label>Name</label>
            <input type="text" name="Name" placeholder="Name" ref={nameInputRef}></input>
          </div>
          <div className={styles.informationForm}>
            <label>Message</label>
            <input
              type="text"
              name="Message"
              placeholder="Type a message (optional)"
              ref={messageInputRef}
            ></input>
          </div>
          <div className={styles.informationForm}>
            <label>Email</label>
            <input
              type="text"
              name="Email"
              placeholder="email@email.com"
              ref={emailInputRef}
            ></input>
          </div>
        </form>
        <h4>Contact Area</h4>
        <div className={styles.contactContainer}>
          <div className={styles.contactArea}>
            <div className={styles.checkboxContact}>
              <input type="checkbox"></input>
              <label>Human resources</label>
            </div>
            <div className={styles.checkboxContact}>
              <input type="checkbox"></input>
              <label>Systems</label>
            </div>
            <div className={styles.checkboxContact}>
              <input type="checkbox"></input>
              <label>Commercial</label>
            </div>
          </div>
          <div className={styles.btnContact}>
            <button className={styles.btnReset} onClick={handleReset}>
              Reset
            </button>
            <button className={styles.btnSend} onClick={onSubmit}>
              Send
            </button>
          </div>
        </div>
      </section>
      <section className={styles.ourStory}>
        <h3>OUR STORY</h3>
        <div className={styles.storyContainer}>
          <div className={styles.storyText}>
            <h4>AN EASY SYSTE</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/assets/images/trackgenix.png`}></img>
          </div>
        </div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Pablo has been
          the industrys standard dummy text ever since the 1500s, when an unknown printer took a
          galley of type and scrambled it to make a type specimen book.
        </p>
      </section>
      <section className={styles.sectionLinks}>
        <div className={styles.linksContainer}>
          <div className={styles.firstLinks}>
            <h4>Products</h4>
            <ul>
              <li>Functionalities</li>
              <li>Downloads</li>
              <li>Integrations</li>
              <li>Extras</li>
            </ul>
          </div>
          <div className={styles.firstLinks}>
            <h4>Company</h4>
            <ul>
              <li>About us</li>
              <li>Clients</li>
              <li>Resources</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className={styles.firstLinks}>
            <h4>Support</h4>
            <ul>
              <li>Help</li>
              <li>Tutorials</li>
              <li>API</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </section>
      <section className={styles.socialMedia}>
        <div className={styles.mediaContainer}>
          <a href={'https://twitter.com/rocketradium'}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/twitter.png`}></img>
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/instagram.png`}></img>
          </a>
          <a href={'https://www.linkedin.com/in/radium-rocket/'}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/linkedin.png`}></img>
          </a>
          <a href={'https://www.facebook.com/radiumrocket?_rdc=1&_rdr'}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/facebook.png`}></img>
          </a>
        </div>
        <div className={styles.city}>
          <p>Rosario, Argentina</p>
        </div>
        <div className={styles.rights}>Copyright © 2022 Radium Rocket. All rights reserved.</div>
      </section>
      {modalDone && <ModalAlert text={msg} onClick={() => setModalDone(false)} />}
    </>
  );
}

export default Home;
