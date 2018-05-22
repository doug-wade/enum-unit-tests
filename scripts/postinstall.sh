#!/usr/bin/env sh

pushd ../babel/packages/babel-core
yarn link
popd
yarn link @babel/core

pushd ../babel/packages/babel-plugin-proposal-enum
yarn link
popd
yarn link @babel/plugin-proposal-enum

pushd ../enum-polyfill
yarn link
popd
yarn link enum-polyfill
