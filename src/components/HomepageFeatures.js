import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Bring Your Team Together',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Don’t be a lonely tester writing scripts in a corner, create test automation frameworks that your whole team enjoys using.
      </>
    ),
  },
  {
    title: 'Automate At Scale',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Write clean, high quality, easily maintained automation code that scales with your test suite, so that you spend your time writing new scenarios, not fixing existing ones.
      </>
    ),
  },
  {
    title: 'Report What Really Matters',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Serenity BDD provides powerful living documentation and test resporting that gives meaningful feedback to testers, business folk, and the team as a whole. Serenity tells you not only what tests have been executed, but more importantly, what requirements have been tested.
      </>
    ),
  },
  {
    title: 'Test Both UI and API Layers',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Serenity supports both UI and API testing, and integrates seemlessly with standard industry tools such as Selenium 4 and RestAssured.
      </>
    ),
  },
  {
    title: 'Integrate with your favorite test automation libraries',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Automate executable specifications with BDD tools like Cucumber, or write clean and maintainable test code with business-readable reporting in JUnit 4 or 5.
      </>
    ),
  },
  {
    title: 'Apply Best Practices',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Use conventional Page Objects, and reduce the amount of code needed by 50% compared to traditional page object implementations, or try out more modern test automation design patterns such as Action Classes or the Screenplay Pattern, and write scalable, easy to maintain code tailor-fitted to your domain.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
