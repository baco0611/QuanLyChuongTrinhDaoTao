<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\HocPhanResource;
use App\Service\HocPhanService;
use Illuminate\Http\Request;

class HocPhanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeSearchMaHocPhan(Request $request)
    {
        $hpService = new HocPhanService();
        $listHP = $hpService->getHocPhanForMaHocPhan($request['keyWord']);
        $hpResource = HocPhanResource::collection($listHP);
        return response()->json([
            'data' =>$hpResource
        ]);
    }
    public function storeSearchTenHocPhan(Request $request)
    {
        $hpService = new HocPhanService();
        $listHP = $hpService->getHocPhanForTenHocPhan($request['keyWord']);
        $hpResource = HocPhanResource::collection($listHP);
        return response()->json([
            'data' =>$hpResource
        ]);
    }
    public function storeSearchMaHocPhanById(Request $request)
    {
        $hpService = new HocPhanService();
        $listHP = $hpService->getHocPhanForMaHocPhanById($request['keyWord'],$request['idCTDT']);
        $hpResource = HocPhanResource::collection($listHP);
        return response()->json([
            'idCTDT'=>intval($request['idCTDT']),
            'data' =>$hpResource
        ]);
    }
    public function storeSearchTenHocPhanById(Request $request)
    {
        $hpService = new HocPhanService();
        $listHP = $hpService->getHocPhanForTenHocPhanById($request['keyWord'],$request['idCTDT']);
        $hpResource = HocPhanResource::collection($listHP);
        return response()->json([
            'idCTDT'=>intval($request['idCTDT']),
            'data' =>$hpResource
        ]);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}