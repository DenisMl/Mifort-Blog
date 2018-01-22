export function getUserInfo() {
  let self = this;
  fetch('/api/getUserInfo', {
    method: 'get',
    dataType: 'json',
    credentials: 'include'
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
    console.log(`v user:`);
    console.log(res);
    self.setState({user: res});
  }).catch(function (err) {
    console.log(`>>err: ${err}`);
  });
}

export function getPublications() {
  let self = this;
  fetch('/api/getPublications', {
    method: 'get',
    dataType: 'json',
    credentials: 'include'
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
    console.log(`v_publications`);
    console.log(res);
    self.setState({publications: res});
  }).catch(function (err) {
    console.log(`>>err: ${err}`);
  });
}

export function addPublication(formData) {
  console.log(formData);
  debugger;
  let self = this;
  let body = JSON.stringify({publicationName: publicationName});
  fetch('/api/addPublication', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: body,
    credentials: 'include'
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
    self.setState({publications: res});
  }).catch(function (err) {
    console.error(`>>err: ${err}`);
  });
}

export function getPublication(id) {
  let self = this;
  let body = JSON.stringify({id: id});
  fetch('/api/getPublication', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: body,
    credentials: 'include'
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
    self.setState({publication: res});
  }).catch(function (err) {
    console.error(`>>err: ${err}`);
  });
}