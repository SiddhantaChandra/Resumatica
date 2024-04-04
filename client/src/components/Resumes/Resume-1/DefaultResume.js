import React, { useEffect, useState } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  StyleSheet,
  Link,
  Image,
} from '@react-pdf/renderer';
import './DefaultResume.css';
import LinkedInLogo from './linkedin-logo.png';
import MapLogo from './map-pin-bold.png';
import MailLogo from './envelope-simple-bold.png';
import PhoneLogo from './phone-bold.png';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DownloadSimple } from '@phosphor-icons/react';
import OrderBox from '../OrderBox';

function Header({ parseData, marginBot, showSection, components, styles }) {
  const photo = parseData.displayPhoto
    ? URL.createObjectURL(parseData.displayPhoto)
    : '';

  console.log(showSection);
  const bodyStyles = {
    marginTop: '28px',
    // marginBottom: '28px',
    // border: '4px',
    color: '#222222',
    fontFamily: 'Times-Roman',
    paddingBottom: marginBot + 'px',
  };
  const linkedInLink = 'https://www.linkedin.com/in/' + parseData.linkedin;

  return (
    <Document>
      <Page size="A4" style={bodyStyles} className="bodyStyles">
        <View style={styles.headingBox} className="heading-box">
          {parseData.displayPhoto && parseData.showPhoto === 0 && (
            <Image src={photo} style={styles.headingPhoto} />
          )}
          <Text style={styles.headingName} className="heading-name">
            {parseData.name}
          </Text>
        </View>
        <View style={styles.headingDetails} className="heading-details">
          {parseData.homeaddress === '' ||
            (parseData.homeaddress === null ? (
              <></>
            ) : (
              <>
                <Image src={MapLogo} style={styles.headingLogo} />
                <Text style={styles.headingDetailsText}>
                  {parseData.homeaddress}
                </Text>
              </>
            ))}
          {parseData.phone === '' ||
            (parseData.phone === null ? (
              <></>
            ) : (
              <>
                <Image src={PhoneLogo} style={styles.headingLogoAlt} />
                <Text style={styles.headingDetailsText}>{parseData.phone}</Text>
              </>
            ))}
          {parseData.email === '' ||
            (parseData.email === null ? (
              <></>
            ) : (
              <>
                <Image src={MailLogo} style={styles.headingLogoAlt} />
                <Link style={styles.headingDetailsText}>{parseData.email}</Link>
              </>
            ))}
          {parseData.linkedin === '' ||
            (parseData.linkedin === null ? (
              <></>
            ) : (
              <>
                <Image src={LinkedInLogo} style={styles.headingLogoAlt} />
                <Link style={styles.headingDetailsText} src={linkedInLink}>
                  {parseData.linkedin}
                </Link>
              </>
            ))}
        </View>
        <View style={styles.lineBreak} />

        {components[0].id === 1 && showSection.Summary === 1 && (
          <Summary parseData={parseData} styles={styles} />
        )}
        {components[0].id === 2 && showSection.Experience === 1 && (
          <Experience parseData={parseData} styles={styles} />
        )}
        {components[0].id === 3 && showSection.Education === 1 && (
          <Education parseData={parseData} styles={styles} />
        )}
        {components[0].id === 4 && showSection.Projects === 1 && (
          <Projects parseData={parseData} styles={styles} />
        )}
        {components[0].id === 5 && showSection.Certifications === 1 && (
          <Certification parseData={parseData} styles={styles} />
        )}
        {components[0].id === 6 && showSection.Skills === 1 && (
          <Skills parseData={parseData} styles={styles} />
        )}
        {/* 1 */}
        {/* <Summary parseData={parseData} styles={styles} /> */}
        {components[1].id === 1 && showSection.Summary === 1 && (
          <Summary parseData={parseData} styles={styles} />
        )}
        {components[1].id === 2 && showSection.Experience === 1 && (
          <Experience parseData={parseData} styles={styles} />
        )}
        {components[1].id === 3 && showSection.Education === 1 && (
          <Education parseData={parseData} styles={styles} />
        )}
        {components[1].id === 4 && showSection.Projects === 1 && (
          <Projects parseData={parseData} styles={styles} />
        )}
        {components[1].id === 5 && showSection.Certifications === 1 && (
          <Certification parseData={parseData} styles={styles} />
        )}
        {components[1].id === 6 && showSection.Skills === 1 && (
          <Skills parseData={parseData} styles={styles} />
        )}
        {/* 2 */}
        {components[2].id === 1 && showSection.Summary === 1 && (
          <Summary parseData={parseData} styles={styles} />
        )}
        {components[2].id === 2 && showSection.Experience === 1 && (
          <Experience parseData={parseData} styles={styles} />
        )}
        {components[2].id === 3 && showSection.Education === 1 && (
          <Education parseData={parseData} styles={styles} />
        )}
        {components[2].id === 4 && showSection.Projects === 1 && (
          <Projects parseData={parseData} styles={styles} />
        )}
        {components[2].id === 5 && showSection.Certifications === 1 && (
          <Certification parseData={parseData} styles={styles} />
        )}
        {components[2].id === 6 && showSection.Skills === 1 && (
          <Skills parseData={parseData} styles={styles} />
        )}
        {/* 3 */}
        {components[3].id === 1 && showSection.Summary === 1 && (
          <Summary parseData={parseData} styles={styles} />
        )}
        {components[3].id === 2 && showSection.Experience === 1 && (
          <Experience parseData={parseData} styles={styles} />
        )}
        {components[3].id === 3 && showSection.Education === 1 && (
          <Education parseData={parseData} styles={styles} />
        )}
        {components[3].id === 4 && showSection.Projects === 1 && (
          <Projects parseData={parseData} styles={styles} />
        )}
        {components[3].id === 5 && showSection.Certifications === 1 && (
          <Certification parseData={parseData} styles={styles} />
        )}
        {components[3].id === 6 && showSection.Skills === 1 && (
          <Skills parseData={parseData} styles={styles} />
        )}
        {/* 4 */}
        {components[4].id === 1 && showSection.Summary === 1 && (
          <Summary parseData={parseData} styles={styles} />
        )}
        {components[4].id === 2 && showSection.Experience === 1 && (
          <Experience parseData={parseData} styles={styles} />
        )}
        {components[4].id === 3 && showSection.Education === 1 && (
          <Education parseData={parseData} styles={styles} />
        )}
        {components[4].id === 4 && showSection.Projects === 1 && (
          <Projects parseData={parseData} styles={styles} />
        )}
        {components[4].id === 5 && showSection.Certifications === 1 && (
          <Certification parseData={parseData} styles={styles} />
        )}
        {components[4].id === 6 && showSection.Skills === 1 && (
          <Skills parseData={parseData} styles={styles} />
        )}
        {/* 5 */}
        {components[5].id === 1 && showSection.Summary === 1 && (
          <Summary parseData={parseData} styles={styles} />
        )}
        {components[5].id === 2 && showSection.Experience === 1 && (
          <Experience parseData={parseData} styles={styles} />
        )}
        {components[5].id === 3 && showSection.Education === 1 && (
          <Education parseData={parseData} styles={styles} />
        )}
        {components[5].id === 4 && showSection.Projects === 1 && (
          <Projects parseData={parseData} styles={styles} />
        )}
        {components[5].id === 5 && showSection.Certifications === 1 && (
          <Certification parseData={parseData} styles={styles} />
        )}
        {components[5].id === 6 && showSection.Skills === 1 && (
          <Skills parseData={parseData} styles={styles} />
        )}
      </Page>
    </Document>
  );
}

function Summary({ parseData, styles }) {
  return (
    <View style={styles.ExperienceBox}>
      <Text style={styles.headingPrimary}>Summary</Text>
      <View style={styles.lineBreakAlt} />
      <Text style={styles.SummaryPadding}>{parseData.summary}</Text>
    </View>
  );
}

const Experience = ({ parseData, styles }) => {
  //style={styles.}
  return (
    <View style={styles.ExperienceBox}>
      <Text style={styles.headingPrimary}>Experience</Text>
      <View style={styles.lineBreakAlt} />
      {parseData.workexperience ? (
        parseData.workexperience.map((el, i) => {
          return (
            <View style={styles.ExperienceSecondBox}>
              <Text style={styles.headingSecondary}>{el.position}</Text>
              <View style={styles.ExperienceThirdBox}>
                <Text>{el.employer}</Text>
                <Text>
                  {el.dates}, {el.location}
                </Text>
              </View>
              <View>
                {el.responsibilities ? (
                  el.responsibilities.map((el) => {
                    return <Text style={styles.paragraph1}> • {el}</Text>;
                  })
                ) : (
                  <Text>No res</Text>
                )}
              </View>
            </View>
          );
        })
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

const Education = ({ parseData, styles }) => {
  return (
    <View style={styles.ExperienceBox}>
      <Text style={styles.headingPrimary}>Education</Text>
      <View style={styles.lineBreakAlt} />
      {parseData.education === null ? (
        <View></View>
      ) : (
        parseData.education.map((el) => {
          return (
            <View style={styles.ExperienceSecondBox}>
              <Text style={styles.headingSecondary}>{el.degree}</Text>
              <Text style={styles.educationText}>
                {el.institution}, {el.location} • {el.dates}
              </Text>
            </View>
          );
        })
      )}
    </View>
  );
};

const Projects = ({ parseData, styles }) => {
  const projectNameText = {
    fontSize: '12px',
    paddingTop: '4px',
    paddingBottom: '1px',
    fontFamily: 'Times-Bold',
    color: '#333',
  };
  // style={styles.
  return (
    <View style={styles.ExperienceBox}>
      <Text style={styles.headingPrimary}>Projects</Text>
      <View style={styles.lineBreakAlt} />
      {parseData.project ? (
        parseData.project.map((el, i) => {
          return (
            <View>
              <View>
                {el.date ? (
                  <Text style={projectNameText}>
                    {el.projectname},{' '}
                    <Text style={styles.projectYearText}>{el.date}</Text>
                  </Text>
                ) : (
                  <Text style={projectNameText}>{el.projectname}</Text>
                )}
              </View>
              <Text style={styles.projectDescText}> • {el.description}</Text>
            </View>
          );
        })
      ) : (
        <View></View>
      )}
    </View>
  );
};

function Certification({ parseData, styles }) {
  const certificateName = {
    fontSize: '11px',
    paddingTop: 4,
  };

  return (
    <View style={styles.ExperienceBox}>
      <Text style={styles.headingPrimary}>Certifications</Text>
      <View style={styles.lineBreakAlt} />
      {parseData.certifications ? (
        parseData.certifications.map((el, i) => {
          return (
            <View>
              <Text style={certificateName}> • {el.certificatename}</Text>
            </View>
          );
        })
      ) : (
        <View></View>
      )}
    </View>
  );
}

function Skills({ parseData, styles }) {
  return (
    <View style={styles.ExperienceBox}>
      <Text style={styles.headingPrimary}>Skills</Text>
      <View style={styles.lineBreakAlt} />
      <Text style={styles.SummaryPadding}>{parseData.skills}</Text>
    </View>
  );
}

function DefaultResume({ parseData, showSection }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log(windowWidth);

  const docStyle = {
    width: windowWidth > 1366 ? '880px' : '640px',
    height: windowWidth > 1366 ? '1132px' : '880px',
  };
  const styles = StyleSheet.create({
    headingBox: {
      textAlign: 'center',
      fontWeight: 'extrabold',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headingName: {
      fontSize: '24px',
      // fontFamily: 'Times-Roman',
      fontFamily: 'Times-Bold',
    },
    headingPhoto: {
      height: '70px',
      width: '70px',
      textAlign: 'center',
      borderRadius: parseData.photoRadius,
    },
    headingDetails: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2px',
      marginTop: '4px',
    },
    headingLogo: {
      height: '12px',
      width: '12px',
    },
    headingLogoAlt: {
      height: '12px',
      width: '12px',
      marginLeft: '10px',
    },
    headingDetailsText: {
      fontSize: '10px',
      fontWeight: 'light',
      textDecoration: 'none',
    },
    lineBreak: {
      height: '1px',
      backgroundColor: '#f1e5e0',
      marginTop: '16px',
      // marginBottom: '8px',
      width: '84%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    SummaryPadding: {
      fontSize: '11px',
      paddingTop: '4px',
    },
    ExperienceBox: {
      width: '84%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    headingPrimary: {
      marginTop: '6px',
      fontSize: '15px',
      fontFamily: 'Times-Bold',
    },
    lineBreakAlt: {
      height: '1px',
      backgroundColor: '#302f3d',
      marginTop: '2px',
      // marginBottom: '2px',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    headingSecondary: {
      fontSize: '12px',
      // color: '#222',
      fontWeight: 'bold',
      fontFamily: 'Times-Bold',
      color: '#333',
    },
    ExperienceSecondBox: {
      marginTop: '4px',
    },
    ExperienceThirdBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: '10px',
      color: '#333',
    },
    paragraph1: {
      fontSize: '10.5px',
      color: '#383838',
      marginLeft: '4px',
    },
    educationText: {
      fontSize: '11px',
    },
    projectNamebox: {},

    projectYearText: {
      fontSize: '11px',
    },
    projectDescText: {
      fontSize: '11px',
      marginLeft: '4px',
    },
  });
  const [marginBot, setMarginBot] = useState('50');
  const [components, setComponents] = useState([
    {
      id: 1,
      title: 'Summary',
      ComponentName: <Summary parseData={parseData} styles={styles} />,
    },
    {
      id: 2,
      title: 'Experience',
      ComponentName: <Experience parseData={parseData} styles={styles} />,
    },
    {
      id: 3,
      title: 'Education',
      ComponentName: <Education parseData={parseData} styles={styles} />,
    },
    {
      id: 4,
      title: 'Projects',
      ComponentName: <Projects parseData={parseData} styles={styles} />,
    },
    {
      id: 5,
      title: 'Certifications',
      ComponentName: <Certification parseData={parseData} styles={styles} />,
    },
    {
      id: 6,
      title: 'Skills',
      ComponentName: <Skills parseData={parseData} styles={styles} />,
    },
  ]);

  const handleMarginChange = (e) => {
    setMarginBot(e.target.value);
  };

  return (
    <section className="section-resume">
      <div className="resume-inter-box">
        <PDFDownloadLink
          document={
            <Header
              parseData={parseData}
              marginBot={marginBot}
              showSection={showSection}
              components={components}
              styles={styles}
            />
          }
        >
          <button className="btn-download">
            <DownloadSimple size={24} /> Download
          </button>
        </PDFDownloadLink>
        <div className="margin-slider">
          <p className="margin-text">Adjust Bottom Gap</p>
          <input
            type="range"
            min="40"
            max="200"
            value={marginBot}
            onChange={handleMarginChange}
            class="slider"
            id="myRange"
          ></input>
        </div>
        <OrderBox components={components} setComponents={setComponents} />
      </div>
      <PDFViewer
        // style={{ width: '450px', height: '640px' }}
        style={docStyle}
        showToolbar={false}
      >
        <Header
          parseData={parseData}
          marginBot={marginBot}
          showSection={showSection}
          components={components}
          styles={styles}
        />
      </PDFViewer>
    </section>
  );
}

export default DefaultResume;
