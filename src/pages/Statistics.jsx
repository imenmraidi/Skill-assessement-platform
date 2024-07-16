import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/joy";
import "../styles/statistics.css";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

function Statistics() {
  const { id } = useParams();

  const { invitations, status } = useSelector(state => state.invitations);
  const { tests, teststatus } = useSelector(state => state.tests);
  const test = tests && tests.find(t => t.id === id);
  const invited = invitations.length;
  const passed = invitations.filter(e => e.testPassed === true).length;
  const qualified =
    test && invitations.filter(i => i.pourcentage >= test.notepassage).length;
  const finished =
    test &&
    invitations.filter(
      i =>
        new Set(i.testResults.map(r => r.questionId)).size ===
        test.questions.length
    ).length;
  const avgscore =
    invitations &&
    (
      invitations
        .filter(e => e.testPassed === true)
        .reduce((acc, i) => acc + i.pourcentage, 0) / passed || 0
    ).toFixed(0);
  const avgtime =
    invitations &&
    formatTime(
      (
        invitations
          .filter(e => e.testPassed === true)
          .map(i => {
            return tempstotal(i.testResults);
          })
          .reduce((acc, t) => acc + t, 0) / passed || 0
      ).toFixed(0)
    );
  const supscore =
    test &&
    invitations.filter(
      e => e.testPassed === true && e.pourcentage >= test.notepassage
    ).length;
  const minscore =
    test &&
    invitations.filter(
      e => e.testPassed === true && e.pourcentage && e.pourcentage < test.notepassage
    ).length;
  const closescore =
    test &&
    invitations.filter(
      e =>
        e.testPassed === true &&
        e.pourcentage < test.notepassage &&
        e.pourcentage >= test.notepassage - 5
    ).length;

  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const data1 = {
    labels: ["Candidats évalués", "Candidats non évalués"],
    datasets: [
      {
        label: "Nombre",
        data: [passed, invited - passed],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: ["Candidats qualifiés", "Candidats non qualifiés"],
    datasets: [
      {
        label: "Nombre",
        data: [qualified, passed - qualified],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: { display: false },
      ticks: {
        min: 0, // it is for ignoring negative step.
        beginAtZero: true,
        callback: function (value, index, values) {
          if (Math.floor(value) === value) {
            return value;
          }
        },
      },
    },
  };
  const data3 = {
    labels: [
      `score >= ${test?.notepassage}%`,
      `score < ${test?.notepassage}%`,
      `score ≈ ${test?.notepassage}%`,
    ],
    datasets: [
      {
        label: "Candidats",
        data: [supscore, minscore, closescore],
        backgroundColor: ["rgba(53, 162, 235, 0.5)"],
      },
    ],
  };
  return (
    invitations &&
    tests &&
    invitations && (
      <div className="statistics">
        <div
          style={{
            width: 250,
            height: 300,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <Doughnut data={data1} />
          <Typography level="h6" variant="h2">
            Candidats invités
          </Typography>
        </div>
        <div
          style={{
            width: 250,
            height: 300,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",

            margin: "20px",
          }}
        >
          <Doughnut data={data2} />
          <Typography level="h6" variant="h2">
            Candidats évalués
          </Typography>
        </div>
        <div
          style={{
            width: 530,
            height: 300,
            // backgroundColor: "beige",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <Bar options={options} data={data3} />
          <Typography level="h6" variant="h2">
            Répartition des scores
          </Typography>
        </div>
        <div
          style={{
            width: 300,
            height: 300,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <div className="statcard">
            <Typography level="h2" variant="h2">
              {avgscore + " %"}
            </Typography>
            <Typography level="body1" variant="h2">
              Score moyen
            </Typography>
          </div>
          <div className="statcard">
            <Typography level="h2" variant="h2">
              {avgtime}
            </Typography>
            <Typography level="body1" variant="h2">
              Temps moyen passé
            </Typography>
          </div>
        </div>
      </div>
    )
  );
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      {
        if (remainingSeconds > 0) return `${minutes}m ${remainingSeconds}s`;
        else return `${minutes} m`;
      }
    } else {
      return `${remainingSeconds} s`;
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

export default Statistics;
