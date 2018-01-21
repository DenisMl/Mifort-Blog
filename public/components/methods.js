export function getUserInfo() {
  let self = this;
  console.log(`getUser:`);
  console.log(self);
  fetch('/api/getUserInfo', {
    method: 'get',
    dataType: 'json',
    credentials: 'include'
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
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
    console.log(res);
    self.setState({publications: res});
  }).catch(function (err) {
    console.log(`>>err: ${err}`);
  });
}

export function addPublication(publicationName) {
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
    console.log(res);
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
    console.log(res);
    self.setState({publication: res});
  }).catch(function (err) {
    console.error(`>>err: ${err}`);
  });
}