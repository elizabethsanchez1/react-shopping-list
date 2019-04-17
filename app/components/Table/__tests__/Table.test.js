import React from 'react';
import renderer from 'react-test-renderer';
import TrackSummaryTable from '../TrackSummaryTable';
import BuildingBuildTable from '../BuildingBuildTable';
import ExerciseInputTable from "../Shared/ExerciseInputTable";


describe('Table Component', () => {


  it('TrackSummaryTable Visually looks the same', () => {
    const tree = renderer.create(
      <TrackSummaryTable
        titles={['Set', 'Weight', 'Reps', 'Total']}
        items={[
          {
            reps: 10,
            set: 1,
            weight: 100,
          },
          {
            set: 2,
            reps: 8,
            weight: 200
          }
        ]}
      />
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  });

  it('BuildingBuildTable Visually looks the same', () => {

    const tree = renderer.create(
      <BuildingBuildTable
        items={ [
          {
            "exercise": "Barbell Squat",
            "weight": "205",
            "sets": "3",
            "reps": "8",
            "compound": true,
            "isolation": false,
            "muscleGroup": "Quads"
          },
          {
            "exercise": "Standing Calf Raise",
            "weight": "105",
            "sets": "5",
            "reps": "12",
            "compound": false,
            "isolation": true,
            "muscleGroup": "Calves"
          },
        ] }
        updateField={ () => console.log('update field working') }
        customSet={() => console.log('custom set working')}
        checkIfCustom={() => console.log('check if custom working ')}
      />
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  });

  it('ExerciseInputTable Visually looks the same', () => {

    const tree = renderer.create(
      <ExerciseInputTable
        items={ [
          { set: 1, reps: 12, weight: 50 },
          { set: 2, reps: 12, weight: 50 },
          { set: 3, reps: 12, weight: 50 }
        ] }
      />
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  });
});
