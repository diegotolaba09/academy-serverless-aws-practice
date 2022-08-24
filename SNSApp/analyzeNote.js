'use strict';

module.exports.handler = (event) => {
  const note = event.Records[0].Sns.Message;
  //define if approved note
  if (note >= 7) {
    console.log(`Approved - will be published: ${note}`);
  } else {
    console.log(`Unapproved - won't be published: ${note}`);
  }
}