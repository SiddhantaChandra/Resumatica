import React, { useState } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  StyleSheet,
  Link,
  Image,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import './DefaultResume.css';
import LinkedInLogo from './linkedin-logo.png';
import MapLogo from './map-pin-bold.png';
import MailLogo from './envelope-simple-bold.png';
import PhoneLogo from './phone-bold.png';
import { DownloadSimple } from '@phosphor-icons/react';

function Header({ parseData, font, marginBot, showSection }) {
  const photo = parseData.displayPhoto
    ? URL.createObjectURL(parseData.displayPhoto)
    : '';
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
      fontFamily: font === 'Times-Roman' ? 'Times-Bold' : font + '-bold',
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

  const bodyStyles = {
    marginTop: '28px',
    // marginBottom: '28px',
    // border: '4px',
    color: '#222222',
    fontFamily: font,
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
        {showSection.showSummary === 1 && (
          <Summary parseData={parseData} styles={styles} />
        )}
        {showSection.showWork === 1 && (
          <Experience parseData={parseData} styles={styles} />
        )}
        {showSection.showEdu === 1 && (
          <Education parseData={parseData} styles={styles} />
        )}
        {showSection.showProj === 1 && (
          <Projects parseData={parseData} styles={styles} font={font} />
        )}
        {showSection.showCert === 1 && (
          <Certification parseData={parseData} styles={styles} />
        )}
        {showSection.showSkills === 1 && (
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

const Projects = ({ parseData, font, styles }) => {
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
    // fontFamily: 'Times-Bold',
    paddingTop: 4,
  };

  // const institutionName = {
  //   fontSize: 11,
  //   marginLeft: 9,
  // };
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
  const [marginBot, setMarginBot] = useState('50');
  const handleMarginChange = (e) => {
    setMarginBot(e.target.value);
  };
  const font = 'Times-Roman';

  return (
    <section className="section-resume">
      <div className="resume-inter-box">
        <PDFDownloadLink
          document={
            <Header
              parseData={parseData}
              font={font}
              marginBot={marginBot}
              showSection={showSection}
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
      </div>
      <PDFViewer
        // style={{ width: '450px', height: '640px' }}
        style={{ width: '640px', height: '880px', backgroundColor: '#fff' }}
        showToolbar={false}
        className="lol"
      >
        <Header
          parseData={parseData}
          font={font}
          marginBot={marginBot}
          showSection={showSection}
        />
      </PDFViewer>
    </section>
  );
}

export default DefaultResume;
