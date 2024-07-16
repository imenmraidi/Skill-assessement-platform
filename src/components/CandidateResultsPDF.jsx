import React, { Component, useState } from "react";
import {
  Document,
  View,
  Page,
  Text,
  pdf,
  StyleSheet,
} from "@react-pdf/renderer";
function CandidateResultsPDF(props) {
  const { candidate, test, questions, invit } = props.data;

  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginLeft: 170,
      marginBottom: 30,
    },
    info: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    dates: {
      fontSize: 16,
      marginBottom: 10,
    },
    scores: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 20,
    },
  });
  return (
    invit && (
      <Document>
        <Page style={styles.container}>
          <View style={styles.title}>
            <Text style={{ marginBottom: 8 }}>Rapport d'évaluation</Text>
          </View>
          <View style={{ fontSize: 22, fontWeight: "bold" }}>
            <Text style={{ marginBottom: 8 }}>Test : {test.name}</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ marginBottom: 8 }} level="h4">
              Candidat :{candidate?.fullname}
            </Text>
            <Text style={{ marginBottom: 8 }}>Email : {candidate?.email}</Text>
          </View>

          <View style={styles.dates}>
            {invit.passedAtDate && (
              <>
                <Text style={{ marginBottom: 8 }}>
                  <Text style={{ marginBottom: 8 }}>
                    Evalué le :
                    {new Date(invit.passedAtDate).toLocaleString(undefined, {
                      timeZone:
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                    })}
                  </Text>
                </Text>
              </>
            )}
            <Text style={{ marginBottom: 8 }}>
              <Text style={{ marginBottom: 8 }}>
                Invité le :
                {new Date(invit.invitedAt).toLocaleString(undefined, {
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                })}
              </Text>
            </Text>

            <Text style={{ marginBottom: 8 }}>
              <Text style={{ marginBottom: 8 }}>
                Invitation expire le :
                {new Date(invit.dateLimite).toLocaleString(undefined, {
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                })}
              </Text>
            </Text>
          </View>

          <View style={styles.scores}>
            <Text style={{ marginBottom: 8 }}>
              {"Questions répondus: " +
                new Set(invit.testResults.map(r => r.questionId)).size +
                " / " +
                questions.length}
            </Text>
            <Text style={{ marginBottom: 8 }}>
              {"Points : " +
                invit.score +
                " / " +
                questions.reduce((acc, q) => acc + q.note, 0)}
            </Text>
            <Text style={{ marginBottom: 8 }}>
              {"Temps total : " +
                formatTime(tempstotal(invit.testResults)) +
                " / " +
                formatTime(questions.reduce((acc, q) => acc + q.duree, 0) * 60)}
            </Text>
            <Text style={{ marginBottom: 8, fontSize: 20 }}>
              {invit.testPassed === true
                ? "Score : " + invit.pourcentage + "%"
                : "Non évalué"}
            </Text>
          </View>
        </Page>
      </Document>
    )
  );
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      {
        if (remainingSeconds > 0) return `${minutes}m ${remainingSeconds}s`;
        else return `${minutes}m`;
      }
    } else {
      return `${remainingSeconds}s`;
    }
  }
  function tempstotal(obj) {
    const uniqueIds = {};
    let totalTime = 0;

    for (let i = 0; i < obj.length; i++) {
      const element = obj[i];
      const id = element.questionId;
      const time = element.dureeReponse;

      if (!uniqueIds[id]) {
        totalTime += time;
        uniqueIds[id] = true;
      }
    }

    return totalTime;
  }
}

export default CandidateResultsPDF;
